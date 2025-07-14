'use client';
import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import {debounce} from 'lodash';
import type { FormStep, FormGroupItem, FormField, FormElement } from '@/types/builder.types';
import { mockSteps } from '@/__mock__/step.mock';
import { mockformGroups } from '@/__mock__/section.mock';
import { mockFields } from '@/__mock__/fields.mock';
import { mockElements } from '@/__mock__/element.mock';

function useHistoryState<T>(initial: T) {
  const [history, setHistory] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initial,
    future: [],
  });

  const set = (newState: T | ((prev: T) => T), rewrite = false) => {
    setHistory(h => {
      const resolved = typeof newState === 'function' ? (newState as (prev: T) => T)(h.present) : newState;
      return rewrite
        ? { ...h, present: resolved }
        : { past: [...h.past, h.present], present: resolved, future: [] };
    });
  };

  const undo = () => setHistory(h => {
    if (h.past.length === 0) return h;
    const previous = h.past[h.past.length - 1];
    return {
      past: h.past.slice(0, -1),
      present: previous,
      future: [h.present, ...h.future],
    };
  });

  const redo = () => setHistory(h => {
    if (h.future.length === 0) return h;
    const next = h.future[0];
    return {
      past: [...h.past, h.present],
      present: next,
      future: h.future.slice(1),
    };
  });

  return {
    state: history.present,
    setState: set,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    undo,
    redo,
  };
}

export type PreviewState = {
  steps: FormStep[];
  formGroups: FormGroupItem[];
  fields: FormField[];
  elements: FormElement[];
};

type ActiveState = {
  activeFormSection: string | null;
  activeFormGroup: string | null;
};

const defaultState: PreviewState = {
  steps: mockSteps,
  formGroups: mockformGroups,
  fields: mockFields,
  elements: mockElements,
};

type PreviewContextType = {
  state: PreviewState;
  updatePreviewContext: (updates: Partial<PreviewState>) => void;
  setState: Dispatch<SetStateAction<PreviewState>>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setActiveFormGroup: (formGroupId: string) => void;
  activeFormGroup: string | null;
  activeFormSection: string | null;
};

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);


export const usePreviewContext = () => {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error('usePreviewContext must be used within a PreviewProvider');
  return ctx;
};


export const PreviewProvider = ({ children }: { children: React.ReactNode }) => {
  const history = useHistoryState<PreviewState>(defaultState);
  const { state, setState, undo, redo, canUndo, canRedo } = history;
  const [active, setActive] = React.useState<ActiveState>({ activeFormGroup: null, activeFormSection: null });
  const updatePreviewContext = (updates: Partial<PreviewState>) => {
    setState((prev: PreviewState) => ({ ...prev, ...updates }));
  };
  const setActiveFormGroup = (formGroupId: string) => {
    const group = state.formGroups.find(g => g.id === formGroupId);
    setActive({
      activeFormGroup: formGroupId,
      activeFormSection: group ? group.formStep : null
    });
  };
  return (
    <PreviewContext.Provider value={{ state, updatePreviewContext, setState, undo, redo, canUndo, canRedo, setActiveFormGroup, activeFormGroup: active.activeFormGroup, activeFormSection: active.activeFormSection }}>
      {children}
    </PreviewContext.Provider>
  );
};
