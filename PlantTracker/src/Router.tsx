import React, { useContext } from 'react';
import { StartPage } from './start/startPage';
import { AppContext, Page } from './model/AppContext';

export function Router(): JSX.Element {

  const ctx = useContext(AppContext);

  const selectPage = () => {
    switch (ctx?.page) {
      case Page.Start: return <StartPage />;
      default: return <></>;
    }
  };

  return selectPage();
}
