import { createContext } from 'react';

export const ReactNativeFormContext = createContext<{
  submit: () => void;
} | null>(null);
