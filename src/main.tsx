import React from 'react';
import Login from './Login';
import './css/bootstrap.css';

import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";

// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Registration from './Registration';
import Activation from './Activation';
import App from './App';
import { store } from './store'
import { Provider } from 'react-redux'

const checkAuthConfig: AxiosRequestConfig = {
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: async () => {
            try {
                return (await axios.get("/api/user", checkAuthConfig));
            } catch (error) {
                // console.log(error.response.data.error)
                return redirect("/login");
            }
        },
    },
    {
        path: "/login",
        element: <Login />,
        loader: async () => {
            try {
                await axios.get("/api/user", checkAuthConfig);
                return redirect("/");
            } catch (error) {
                return null;
            }
        },
    },
    {
        path: "/logout",
        loader: async () => {
            await axios.post("/api/logout");
            return redirect("/login");
        },
    },
    {
        path: "/registration",
        element: <Registration />
    },
    {
        path: "/activation/:code",
        loader: async ({ params }) => {
            const code = params.code;
            let data;
            try {
                data = await axios.get("/api/user/activate/" + code);
            } catch (error) {
                data = (error as AxiosError).response;
            }
            return data;
        },
        element: <Activation />
    },
]);

const container: HTMLElement = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
