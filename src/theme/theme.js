import { system } from "@chakra-ui/react/preset";

const newStyles = {
    ":root": {
        fontSize: "62.5%",

        // CONTENT
        "--content-primary": "#ae4458",
        "--content-secondary": "#eda8b5",
        "--content-tertiary": "#ff7294",
        "--content-quatertiary": "#f9c8c5",
        "--content-brand": "#9282FA",
        "--content-brand-contrast": "#050505",
        "--content-brand-shadow": "#9485fa4d",

        // BACKGROUND
        "--background-primary": "var(--content-primary)",
        "--background-secondary": "var(--content-secondary)",
        "--background-tertiary": "#ffffff",
        "--background-quaternary": "#1f2223",

        // BORDER
        "--border-primary": "#3E3C41",
        "--border-divisor": "#f9c8c5",
    },
    "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontSize: "1.6rem",
        fontFamily: "Quicksand",
    },

    body: {
        height: "100vh",
        backgroundImage: `url("/src/assets/background.svg")`,
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
