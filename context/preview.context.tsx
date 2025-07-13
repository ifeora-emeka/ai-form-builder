'use client';
import * as React from 'react';
const { createContext, useContext, useState, useEffect } = React;
import type { FormStep, FormGroupItem, FormField, FormElement } from '@/types/builder.types';
import { mockSteps } from '@/__mock__/step.mock';
import { mockformGroups } from '@/__mock__/section.mock';
import { mockFields } from '@/__mock__/fields.mock';
import { mockElements } from '@/__mock__/element.mock';
import { debounce } from 'lodash';

export type PreviewState = {
  steps: FormStep[];
  formGroups: FormGroupItem[];
  fields: FormField[];
  elements: FormElement[];
};

const defaultState: PreviewState = {
  steps: mockSteps,
  formGroups: mockformGroups,
  fields: mockFields,
  elements: mockElements,
};

const PreviewContext = createContext<{
  state: PreviewState;
  updatePreviewContext: (updates: Partial<PreviewState>) => void;
  setState: React.Dispatch<React.SetStateAction<PreviewState>>;
} | undefined>(undefined);

export const usePreviewContext = () => {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error('usePreview must be used within a PreviewProvider');
  return ctx;
};

export const PreviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<PreviewState>({
    steps: defaultState.steps,
    formGroups: defaultState.formGroups,
    fields: defaultState.fields,
    elements: defaultState.elements,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedState = window.localStorage.getItem('previewState');
    if (storedState) {
      setState(JSON.parse(storedState));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (process.env.NODE_ENV === 'development') {
      window.localStorage.setItem('previewState', JSON.stringify(state));
    }
  }, [state, hydrated]);

  const updatePreviewContext = debounce((updates: Partial<PreviewState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  }, 300);

  return (
    <PreviewContext.Provider value={{ state, updatePreviewContext, setState }}>
      {children}
    </PreviewContext.Provider>
  );
};
