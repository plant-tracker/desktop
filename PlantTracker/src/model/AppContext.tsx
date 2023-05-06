import React, { ReactNode, createContext, useState } from 'react';
import { SAMPLE_USER_STORAGE, UserStorage } from './userStorage';
import { Plant } from './plant';
import { Task } from './task';

export enum Page {
	Start,
	Home,
	Plants,
  AddPlant,
  ViewPlant,
  AddTask,
};

export type AppContextType = {
	page: Page,
	setPage: (page: Page) => void,
  userStorage: UserStorage;

  currentPlant?: Plant;
  setPageWithPlant: (page: Page, plant: Plant, task?: Task) => void;

  currentTask?: Task;
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
  const [page, setPage] = useState(Page.Plants);
  const [userStorage, setUserStorage] = useState(SAMPLE_USER_STORAGE);
  const [currentPlant, setCurrentPlant] = useState<Plant>();
  const [currentTask, setCurrentTask] = useState<Task>();
  // const [savedApp, setSavedApp] = useReducer(savedAppReducer, []);

  const setPageWithPlant = (page: Page, plant: Plant, task?: Task) => {
    setCurrentPlant(plant);
    setCurrentTask(task);
    setPage(page);
  };

  return (
    <AppContext.Provider
      value={{
        page, setPage,
        userStorage,
        currentPlant,
        currentTask,
        setPageWithPlant,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
