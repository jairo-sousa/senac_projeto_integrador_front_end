import { system } from "@chakra-ui/react/preset";

const newStyles = {
    ":root": {
        fontSize: "62.5%",

        // CONTENT
        "--content-primary": "#fff",
        "--content-secondary": "#98959D",
        "--content-tertiary": "#666666",
        "--content-brand": "#9282FA",
        "--content-brand-contrast": "#050505",
        "--content-brand-shadow": "#9485fa4d",

        // BACKGROUND
        "--background-primary": "#14151d",
        "--background-secondary": "#23242C",
        "--background-tertiary": "#2E2C30",
        "--background-quaternary": "#1f2223",

        // BORDER
        "--border-primary": "#3E3C41",
        "--border-divisor": "#2E2C30",
    },
    "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontSize: "1.6rem",
    },

    body: {
        height: "100vh",
        backgroundColor: "var(--background-primary)",
        color: "var(--content-primary)",
        fontWeight: "bold",
    },
    "#root": {
        height: "100%",
        width: "100%",
        display: "flex",
    },
    table: {
        borderCollapse: "collapse",
    },

    "th, td": {
        textAlign: "start",
        fontSize: "1.4rem",
        flex: 1,
    },
    select: {
        outline: "none",
    },
    option: {
        height: "inherit",
    },
    "::placeholder": {
        color: "var(--content-secondary)",
        opacity: 1,
    },

    "::-ms-input-placeholder": {
        color: "var(--content-secondary)",
        opacity: 1,
    },
};

Object.assign(system._config.globalCss, newStyles);

export default system;
