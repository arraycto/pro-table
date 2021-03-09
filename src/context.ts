import { createContext, useContext } from 'react';
import { PTContext } from './types';

export const Context = createContext<PTContext | null>(null);
export const useProTableContext = (): PTContext => useContext(Context) as PTContext;
export const usePTContext = useProTableContext;
