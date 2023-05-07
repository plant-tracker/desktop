import React, { ReactNode, createContext, useState } from 'react';
import { UserStorage } from './userStorage';
import { Plant } from './plant';
import { Task } from './task';
import { Notifications } from '../notifications';

export enum Page {
	Start,
	Home,
	Plants,
  AddPlant,
  ViewPlant,
  AddTask,
  Settings,
};

export type AppContextType = {
	page: Page,
	setPage: (page: Page) => void,
  userStorage: UserStorage;
  setUserStorage: (data: UserStorage) => void;

  currentPlant?: Plant;
  setPageWithPlant: (page: Page, plant: Plant, task?: Task) => void;

  currentTask?: Task;

  enableNotifications: boolean;
  setEnableNotifications: (val: boolean) => void;
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
  const [page, setPage] = useState(Page.Start);
  const [userStorage, setUserStorage] = useState<UserStorage>({ email: '', plants: [], tasks: [] });
  const [currentPlant, setCurrentPlant] = useState<Plant>();
  const [currentTask, setCurrentTask] = useState<Task>();
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [notificationService, setNotificationService] = useState<Notifications>();
  // const [savedApp, setSavedApp] = useReducer(savedAppReducer, []);

  const setPageWithPlant = (page: Page, plant: Plant, task?: Task) => {
    setCurrentPlant(plant);
    setCurrentTask(task);
    setPage(page);
  };

  // notifications - create the service once
  // and save it to the state
  let notif: Notifications | undefined;
  if (!notificationService) {
    console.log('--- Notifications - create');
    notif = new Notifications();
    notif.start();
    setNotificationService(notif);
  }
  // when list of tasks or option to enable notifications change, update the service
  console.log('--- Notifications - update', enableNotifications, userStorage?.tasks);
  notif = notif || notificationService;
  if (enableNotifications && userStorage)
    notif!.set(userStorage.tasks);
  else
    notif!.set([]);

  return (
    <AppContext.Provider
      value={{
        page, setPage,
        userStorage, setUserStorage,
        currentPlant,
        currentTask,
        setPageWithPlant,
        enableNotifications, setEnableNotifications,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
