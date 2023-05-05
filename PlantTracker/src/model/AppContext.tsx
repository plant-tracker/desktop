import React, { ReactNode, createContext, useState } from 'react';
import { SAMPLE_USER_STORAGE, UserStorage } from './userStorage';

export enum Page {
	Start,
	Home,
	Plants,
  AddPlant,
};

export type AppContextType = {
	page: Page,
	setPage: (page: Page) => void,
  userStorage: UserStorage;
};


/*
// saved App reducer function
const savedAppReducer = (state, action) => {
  // get the book object and the type of action by destructuring
  const { book, type } = action;

  // if 'add'
  // return an array of the previous state and the book object
  if (type === 'add') return [...state, book];

  // if 'remove'
  // remove the book object in the previous state
  // that matches the title of the current book object
  if (type === 'remove') {
    const bookIndex = state.findIndex((x) => x.title === book.title);

    // if no match, return the previous state
    if (bookIndex < 0) return state;

    // avoid mutating the original state, create a copy
    const stateUpdate = [...state];

    // then splice it out from the array
    stateUpdate.splice(bookIndex, 1);
    return stateUpdate;
  }
  return state;
};
*/
export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider(props: { children: ReactNode }) {
  const [page, setPage] = useState(Page.AddPlant);
  const [userStorage, setUserStorage] = useState(SAMPLE_USER_STORAGE);
  // const [savedApp, setSavedApp] = useReducer(savedAppReducer, []);

	// setPage(Page.Home);

  return (
    <AppContext.Provider
      value={{
        page, setPage,
        userStorage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
