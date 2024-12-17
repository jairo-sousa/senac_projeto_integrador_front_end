import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { ChakraProvider } from "@chakra-ui/react";
import system from "./theme/theme.js";

import { SideBar } from "./components/SideBar.jsx";

import { router } from "./router.jsx";

export const API_URL = "http://localhost:3100";

let container = null;
document.addEventListener("DOMContentLoaded", function (event) {
    if (!container) {
        container = document.getElementById("root");
        const root = createRoot(container);
        root.render(
            <StrictMode>
                <ChakraProvider value={system}>
                    <SideBar />
                    <RouterProvider router={router} />
                </ChakraProvider>
            </StrictMode>
        );
    }
});
