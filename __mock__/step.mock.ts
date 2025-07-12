import type { FormStep } from '@/types/builder.types';

export const mockSteps: FormStep[] = [
  {
    id: 'step-1',
    index: 0,
    name: 'Personal Info',
    hidden: false,
  },
  {
    id: 'step-2',
    index: 1,
    name: null,
    hidden: false,
  },
  {
    id: 'step-3',
    index: 2,
    name: 'Survey Details',
    hidden: false,
  },
  {
    id: 'step-4',
    index: 3,
    name: null,
    hidden: false,
  },
];
