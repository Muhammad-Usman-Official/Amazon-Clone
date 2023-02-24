import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reducer, { initialState } from './components/reducer';
import { StateProvider } from './components/StateProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </React.StrictMode>
);
