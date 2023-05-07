import React, { useContext } from 'react';
import { StartPage } from './start/startPage';
import { AppContext, Page } from './model/AppContext';
import { HomePage } from './pages/homePage';
import { PlantsPage } from './pages/plantsPage';
import { AddPlantPage } from './pages/addPlantPage';
import { ViewPlantPage } from './pages/viewPlantPage';
import { AddTaskPage } from './pages/addTaskPage';
import { SettingsPage } from './pages/settingsPage';

export function Router(): JSX.Element {

  const ctx = useContext(AppContext);

  const selectPage = () => {
    switch (ctx?.page) {
      case Page.Start: return <StartPage />;
      case Page.Home: return <HomePage />;
      case Page.Plants: return <PlantsPage />;
      case Page.AddPlant: return <AddPlantPage />;
      case Page.ViewPlant: return <ViewPlantPage plant={ctx.currentPlant!} />;
      case Page.AddTask: return <AddTaskPage plant={ctx.currentPlant!} />;
      case Page.Settings: return <SettingsPage />;
      default: return <></>;
    }
  };

  return selectPage();
}
