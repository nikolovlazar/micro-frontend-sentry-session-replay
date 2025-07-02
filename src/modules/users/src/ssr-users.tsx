import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import Root from './root.component';
import ErrorBoundaryComponent from './error-boundary';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Root />}
      errorElement={<ErrorBoundaryComponent />}
    />
  )
);

const RootComponent = () => {
  return <RouterProvider router={router} />;
};

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: RootComponent,
  domElementGetter: () => document.getElementById('users'),
  renderType: 'createRoot',
});

export const { bootstrap, mount, unmount } = lifecycles;
