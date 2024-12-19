export const dayPhases = {
    morning: {
        phase: "Manhã",
        icon: "/src/assets/morning.svg",
        period: "09h-12h",
    },
    afternoon: {
        phase: "Tarde",
        icon: "/src/assets/afternoon.svg",
        period: "13h-18h",
    },
    evening: {
        phase: "Noite",
        icon: "/src/assets/evening.svg",
        period: "19h-21h",
    },
};

export const getDayPhase = (date) => {
    const [datePart, timePart] = date.split("T");

    const hour = parseInt(timePart.split(":")[0]);

    if (hour >= 6 && hour < 12) {
        return dayPhases.morning;
    } else if (hour >= 12 && hour < 18) {
        return dayPhases.afternoon;
    } else {
        return dayPhases.evening;
    }
};
