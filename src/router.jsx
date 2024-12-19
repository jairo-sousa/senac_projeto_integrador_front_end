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
        name: "AGENDA",
        path: "/",
        bg: "#ff7294",
        color: "#f6dad9",
    },
    {
        name: "CLIENTES",
        path: "clients",
        bg: "#f9c8c5",
        color: "#ae4458",
    },
    {
        name: "SERVIÇOS",
        path: "services",
        bg: "#ae4458",
        color: "#ffffff",
    },
];
