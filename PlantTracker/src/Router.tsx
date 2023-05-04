import React, { useContext } from 'react';
import { StartPage } from './start/startPage';
import { AppContext, Page } from './model/AppContext';
import { HomePage } from './pages/homePage';
import { PlantsPage } from './pages/plantsPage';

export function Router(): JSX.Element {

  const ctx = useContext(AppContext);

  const selectPage = () => {
    switch (ctx?.page) {
      case Page.Start: return <StartPage />;
      case Page.Home: return <HomePage />;
      case Page.Plants: return <PlantsPage />;
      default: return <></>;
    }
  };

  return selectPage();
}
