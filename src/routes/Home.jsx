import { BasePageBody } from "../components/base/BasePageBody.jsx";
import { BaseMainSection } from "../components/base/BaseMainSection.jsx";

import { BaseContentGroup } from "../components/base/BaseContentGroup.jsx";

import { BaseButton } from "../components/base/BaseButton.jsx";
import { HomeHeader } from "../components/home/HomeHeader.jsx";
import { DayPhaseContent } from "../components/home/DayPhaseContent.jsx";
import { BaseButtonSection } from "../components/base/BaseButtonSection.jsx";
import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { API_URL } from "../main";
import { dayPhases, getDayPhase } from "../static/dayPhases.js";
import { BaseModal } from "../modal/BaseModal.jsx";
import { schedulingFields } from "../static/modelFields.js";
import { BaseModalRow } from "../modal/BaseModalRow.jsx";
import { BaseModalInput } from "../modal/BaseModalInput.jsx";
import { Box } from "@chakra-ui/react";
// import React from "react";

export function Home() {
    // DATE
    const [selectedDate, setSelectedDate] = useState(getTodayDate());

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    // DATA GET
    const [schedulings, setSchedulings] = useState([]);
    const [clients, setClients] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [updatingScheduling, setUpdatingScheduling] = useState(null);

    const [morningSchedulings, setMorningSchedulings] = useState([]);
    const [afternoonSchedulings, setAfternoonSchedulings] = useState([]);
    const [eveningSchedulings, setEveningSchedulings] = useState([]);

    const inputRefs = useRef([]);

    const getAllSchedulings = (date) => {
        axios
            .get(`${API_URL}/scheduling/view-full/${date}`)
            .then((res) => {
                setSchedulings(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getScheduling = (id) => {
        axios
            .get(`${API_URL}/scheduling/${id}`)
            .then((res) => {
                setUpdatingScheduling(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getClients = () => {
        axios
            .get(`${API_URL}/client/view-names`)
            .then((res) => {
                setClients(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getServices = () => {
        axios
            .get(`${API_URL}/service/view-names`)
            .then((res) => {
                setServices(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const cleanInputs = () => {
        inputRefs.current.map((input) => {
            if (input.type === "text" || input.type === "password") {
                input.value = "";
            }
            if (input.id === "client" || input.id === "service") {
                input.value = 0;
            }
            if (input.id === "time") {
                input.value = "00:00";
            }
            if (input.id === "date") {
                input.value = selectedDate;
            }
            if (input.id === "status") {
                input.value = "Pendente";
            }

            setSelectedServices([]);
        });
    };

    const setInputs = () => {
        setSelectedServices([]);
        inputRefs.current.map((input) => {
            if (input.id === "client") {
                const client = clients.filter(
                    (client) => client.id === updatingScheduling.clientId
                );
                input.value = client[0].name;
            }
            if (input.id === "service") {
                input.value = 0;
                updatingScheduling?.services.forEach((service) => {
                    setSelectedServices((prevServices) => [
                        ...prevServices,
                        {
                            id: service.id,
                            name: service.name,
                        },
                    ]);
                });
            }

            if (input.id === "time") {
                input.value = updatingScheduling.date
                    ?.split("T")[1]
                    ?.split(":")
                    .slice(0, 2)
                    .join(":");
            }
            if (input.id === "date") {
                input.value = selectedDate;
            }
            if (input.id === "status") {
                input.value = "Pendente";
            }
        });
    };

    useEffect(() => {
        const date = selectedDate;
        getAllSchedulings(date);
    }, [selectedDate]);

    useEffect(() => {
        if (updatingScheduling) {
            setInputs();
        }
    }, [updatingScheduling]);

    useEffect(() => {
        if (schedulings && schedulings.length > 0) {
            setMorningSchedulings(
                schedulings.filter(
                    (scheduling) =>
                        getDayPhase(scheduling.date) === dayPhases.morning
                )
            );
            setAfternoonSchedulings(
                schedulings.filter(
                    (scheduling) =>
                        getDayPhase(scheduling.date) === dayPhases.afternoon
                )
            );
            setEveningSchedulings(
                schedulings.filter(
                    (scheduling) =>
                        getDayPhase(scheduling.date) === dayPhases.evening
                )
            );
        }
    }, [selectedDate, schedulings]);

    // DATA POST
    const handleSave = (data) => {
        // console.log(data);

        const updatedData = {
            date: `${data.date}T${data.time}:00z`,
            status: "Pendente",
            clientName: data.client,
            services: selectedServices.map((service) => service.id),
        };

        if (updatingScheduling) {
            axios
                .put(
                    `${API_URL}/scheduling/${updatingScheduling.id}`,
                    updatedData
                )
                .then((response) => {
                    console.log(
                        "Agendamento atualizado com sucesso:",
                        response.data
                    );
                    setUpdatingScheduling(null);
                    getAllSchedulings(selectedDate);
                    handleModalDisplay();
                })
                .catch((error) => {
                    console.error("Erro ao atualizar Agendamento:", error);
                    handleModalDisplay();
                });
        } else {
            axios
                .post(`${API_URL}/scheduling`, updatedData)
                .then((response) => {
                    console.log(
                        "Agendamento criado com sucesso:",
                        response.data
                    );
                    getAllSchedulings(selectedDate);
                    handleModalDisplay();
                })
                .catch((error) => {
                    console.error("Erro ao cadastrar Agendamento:", error);
                    handleModalDisplay();
                });
        }
    };

    // DATA PUT
    const handleUpdate = (id) => {
        handleModalDisplay();
        getClients();
        getServices();
        getScheduling(id);
    };

    // DATA DELETE
    const handleDelete = (id) => {
        axios
            .delete(`${API_URL}/scheduling/${id}`)
            .then((response) => {
                console.log("agendamento removido com sucesso:");
                getAllSchedulings(selectedDate);
            })
            .catch((error) => {
                console.error("Erro ao remover agendamento:", error);
            });
    };

    // MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalDisplay = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <BasePageBody>
            <BaseMainSection>
                <HomeHeader
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                />

                <BaseContentGroup>
                    {Array.isArray(morningSchedulings) &&
                        morningSchedulings.length > 0 &&
                        schedulings.length > 0 && (
                            <DayPhaseContent
                                deleteCallback={handleDelete}
                                editCallback={handleUpdate}
                                key={`morning-${selectedDate}`}
                                dayPhase={dayPhases.morning}
                                schedulings={morningSchedulings}
                            />
                        )}

                    {Array.isArray(afternoonSchedulings) &&
                        afternoonSchedulings.length > 0 &&
                        schedulings.length > 0 && (
                            <DayPhaseContent
                                deleteCallback={handleDelete}
                                editCallback={handleUpdate}
                                key={`afternoon-${selectedDate}`}
                                dayPhase={dayPhases.afternoon}
                                schedulings={afternoonSchedulings}
                            />
                        )}

                    {Array.isArray(eveningSchedulings) &&
                        eveningSchedulings.length > 0 &&
                        schedulings.length > 0 && (
                            <DayPhaseContent
                                deleteCallback={handleDelete}
                                editCallback={handleUpdate}
                                key={`evening-${selectedDate}`}
                                dayPhase={dayPhases.evening}
                                schedulings={eveningSchedulings}
                            />
                        )}
                </BaseContentGroup>
            </BaseMainSection>

            <BaseButtonSection>
                <BaseModal
                    isOpen={isModalOpen}
                    title={"Novo Agendamento"}
                    handleDisplayCallback={handleModalDisplay}
                    handleSaveCallback={handleSave}
                    inputRefs={inputRefs}
                >
                    {schedulingFields.map((field, index) => (
                        <BaseModalRow key={field.id} customPy={"0"}>
                            <BaseModalInput
                                name={field.name}
                                id={field.id}
                                customType={field.type}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onchangeCalback={(e) => {
                                    const selectedService = services.find(
                                        (service) =>
                                            service.name === e.target.value
                                    );
                                    if (selectedService) {
                                        const serviceExists =
                                            selectedServices.some(
                                                (service) =>
                                                    service.id ===
                                                    selectedService.id
                                            );

                                        if (!serviceExists) {
                                            setSelectedServices(
                                                (prevSelectedServices) => [
                                                    ...prevSelectedServices,
                                                    selectedService,
                                                ]
                                            );
                                        }
                                    }
                                }}
                            >
                                {field.type === "select" && (
                                    <Box
                                        as={"option"}
                                        bgColor={"inherit"}
                                        fontSize={"inherit"}
                                        lineHeight={"4rem"}
                                        value={0}
                                    >
                                        {`Escolha ${field.name}`}
                                    </Box>
                                )}

                                {field.type === "select" &&
                                    field.id === "client" &&
                                    clients?.map((client) => (
                                        <Box
                                            key={client.id}
                                            as={"option"}
                                            bgColor={"inherit"}
                                            fontSize={"inherit"}
                                            lineHeight={"4rem"}
                                            value={client.name}
                                        >
                                            {client.name}
                                        </Box>
                                    ))}

                                {field.type === "select" &&
                                    field.id === "service" &&
                                    services?.map((service) => (
                                        <Box
                                            key={service.id}
                                            as={"option"}
                                            bgColor={"inherit"}
                                            fontSize={"inherit"}
                                            lineHeight={"4rem"}
                                            value={service.name}
                                        >
                                            {service.name}
                                        </Box>
                                    ))}
                            </BaseModalInput>
                        </BaseModalRow>
                    ))}

                    {selectedServices.length > 0 && (
                        <>
                            <Box as={"label"} fontWeight={500}>
                                Serviços selecionados
                            </Box>
                            {selectedServices.map((service) => (
                                <BaseModalRow
                                    key={`${
                                        service.name
                                    } ${selectedServices.indexOf(service)} `}
                                    customPy={"0"}
                                >
                                    {service.name}
                                    <Box
                                        as={"img"}
                                        src="/src/assets/cross.svg"
                                        h={"1.2rem"}
                                        id={service.id}
                                        onClick={() => {
                                            setSelectedServices(
                                                (prevSelectedServices) =>
                                                    prevSelectedServices.filter(
                                                        (selectedService) =>
                                                            selectedService.id !==
                                                            service.id
                                                    )
                                            );
                                        }}
                                    />
                                </BaseModalRow>
                            ))}
                        </>
                    )}
                </BaseModal>
                <BaseButton
                    parentOnclickCalback={() => {
                        cleanInputs();
                        getClients();
                        getServices();
                        handleModalDisplay();
                    }}
                >
                    NOVO AGENDAMENTO
                </BaseButton>
            </BaseButtonSection>
        </BasePageBody>
    );
}

function getTodayDate() {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
}
