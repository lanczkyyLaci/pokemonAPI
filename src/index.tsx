import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routers/RouterConfig';
// import App from './App';
import './index.scss';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter(routes);

root.render(
	<React.StrictMode>
		{/* Redux Provider to provide the store to all components */}
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

// Function to report web vitals (performance metrics)
// reportWebVitals();
