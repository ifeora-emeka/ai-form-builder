import React, { createContext, useContext, useState } from 'react';
import type { AITask } from '@/types/ai.types';

interface AIContextState {
  tasks: AITask[];
  activeTask: AITask | null;
}

interface AIContextValue extends AIContextState {
  setAIState: (state: Partial<AIContextState>) => void;
}

const AIContext = createContext<AIContextValue | undefined>(undefined);

export const AIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AIContextState>({
    tasks: [],
    activeTask: null,
  });

  const setAIState = (updates: Partial<AIContextState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <AIContext.Provider value={{ ...state, setAIState }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = () => {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error('useAIContext must be used within an AIProvider');

  const mountTasks = (tasks: AITask[]) => {
    ctx.setAIState({ tasks, activeTask: null });
  };

  const startTask = () => {
    if (ctx.tasks.length > 0) {
      const firstTask = ctx.tasks.reduce((prev, curr) => (curr.index < prev.index ? curr : prev), ctx.tasks[0]);
      ctx.setAIState({ activeTask: firstTask });
    }
  };

  const startNextTask = () => {
    if (!ctx.activeTask) return;
    const sorted = [...ctx.tasks].sort((a, b) => a.index - b.index);
    const currentIdx = sorted.findIndex(t => t.index === ctx.activeTask!.index);
    if (currentIdx >= 0 && currentIdx < sorted.length - 1) {
      ctx.setAIState({ activeTask: sorted[currentIdx + 1] });
    } else {
      ctx.setAIState({ activeTask: null, tasks: [] });
    }
  };

  return { ...ctx, mountTasks, startTask, startNextTask };
};
