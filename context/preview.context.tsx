'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FormStep, FormGroupItem, FormField, FormElement } from '@/types/builder.types';
import { mockSteps } from '@/__mock__/step.mock';
import { mockSectionItems } from '@/__mock__/section.mock';
import { mockFields } from '@/__mock__/fields.mock';
import { mockElements } from '@/__mock__/element.mock';

export type PreviewState = {
  steps: FormStep[];
  sectionItems: FormGroupItem[];
  fields: FormField[];
  elements: FormElement[];
};

const defaultState: PreviewState = {
  steps: mockSteps,
  sectionItems: mockSectionItems,
  fields: mockFields,
  elements: mockElements,
};

const PreviewContext = createContext<{
  state: PreviewState;
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
    sectionItems: defaultState.sectionItems,
    fields: defaultState.fields,
    elements: defaultState.elements,
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      window.localStorage.setItem('previewState', JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    const storedState = window.localStorage.getItem('previewState');
    if (storedState) {
      setState(JSON.parse(storedState));
    } else {
      setState(defaultState);
    }
  },[])

  console.log('PreviewProvider initialized with state:', state);

  return (
    <PreviewContext.Provider value={{ state, setState }}>
      {children}
    </PreviewContext.Provider>
  );
};
