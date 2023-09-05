import ReactDOM from 'react-dom/client';
import "./styles/index.css";
import "./styles/icons/style.css";
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as pages from "./pages";
import { page } from './models/page';
import React from 'react';
import { Provider } from 'react-redux';
import store from './manager/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/*important this little loop gets all the component from pages "pages/index.ts" and turn them into RouteObject 
this makes react apps a lot look like a framwork;the components in page must have a displayName this was faster for me but it can be changed
displayName is the url of the each page*/

const App: React.FC<{ Component: page }> = ({ Component }) => {
  const getLayout = Component.getLayout ?? (page => page)
  return (
    <React.Fragment>
      {getLayout(<Component />)}
    </React.Fragment>
  )
}

let routes: RouteObject[] = Object.entries(pages).map(([key, Value]) => ({
  path: Value.url,
  element: <App Component={Value} />
}));

const router = createBrowserRouter(routes);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);