import * as React from "react";
import { useLocalStore, observer } from "mobx-react-lite";

const { createContext } = React;

export const MyContext = createContext(null);

export const Counter = observer(props => {
  const store = useLocalStore(() => ({
    count: 1,
    get getCount() {
      return store.count;
    },
    handleCount() {
      store.count += 2;
    }
  }));
  return (
    <MyContext.Provider value={store}>{props.children}</MyContext.Provider>
  );
});
