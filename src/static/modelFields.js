export const serviceFields = [
    {
        name: "Nome",
        id: "name",
        type: "text",
    },
    {
        name: "Descrição",
        id: "description",
        type: "text",
    },
    {
        name: "Duração (minutos)",
        id: "duration",
        type: "number",
    },
    {
        name: "Preço",
        id: "price",
        type: "number",
    },
];

export const clientFields = [
    {
        name: "Nome",
        id: "name",
        type: "text",
    },
    {
        name: "Telefone",
        id: "phone",
        type: "text",
    },
    {
        name: "Data de nascimento",
        id: "birthdate",
        type: "date",
    },
    {
        name: "Rua",
        id: "street",
        type: "text",
    },
    {
        name: "Bairro",
        id: "neighborhood",
        type: "text",
    },
    {
        name: "Cidade",
        id: "city",
        type: "text",
    },
    {
        name: "Estado",
        id: "state",
        type: "text",
    },
];

export const schedulingFields = [
    {
        name: "Cliente",
        id: "client",
        type: "select",
    },
    {
        name: "Serviços",
        id: "service",
        type: "select",
    },
    {
        name: "Horário",
        id: "time",
        type: "time",
    },
    {
        name: "Data",
        id: "date",
        type: "date",
    },
    {
        name: "Status",
        id: "status",
        type: "text",
        defaultValue: "pendente",
    },
];
