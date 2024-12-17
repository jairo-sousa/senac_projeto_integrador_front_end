export function dateStringToTime(dateString) {
    const data = new Date(dateString);

    const formatedDate = data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return formatedDate;
}
