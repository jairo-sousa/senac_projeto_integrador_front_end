import { ErrorPage } from "./routes/ErrorPage.jsx";
import { Home } from "./routes/Home.jsx";
import { Services } from "./routes/Services.jsx";
import { Clients } from "./routes/Clients.jsx";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/services",
        element: <Services />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/clients",
        element: <Clients />,
        errorElement: <ErrorPage />,
    },
]);

export const links = [
    {
        name: "Agenda",
        path: "/",
    },
    {
        name: "Clientes",
        path: "clients",
    },
    {
        name: "Serviços",
        path: "services",
    },
];
