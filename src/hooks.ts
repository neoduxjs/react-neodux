import {useState, useEffect} from 'react';
import {Store} from 'neodux';

export function useStore(store: Store) {
  const useStoreState = function(path: string | string[]) {
    if (!(path instanceof Array)) {
      path = path.split('.');
    }
    const getter = store.get(path);
    const [state, updateState] = useState(getter.value);
    useEffect(() => {
      return getter.subscribe(updateState);
    });
    return state;
  };
  const useAction = function(actionName: string) {
    return store.actions[actionName];
  };
  return {useState: useStoreState, useAction};
}
