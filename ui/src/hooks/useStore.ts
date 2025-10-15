import { useEffect, useState } from 'react';
import { appStore } from '../store/AppStore';

export function useStore() {
  const [state, setState] = useState(appStore.getState());

  useEffect(() => {
    const unsubscribe = appStore.subscribe(() => {
      setState(appStore.getState());
    });
    return unsubscribe;
  }, []);

  return state;
}

