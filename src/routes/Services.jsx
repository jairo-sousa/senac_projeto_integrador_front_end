import axios from "axios";

import { API_URL } from "../main";

import { BaseButton } from "../components/base/BaseButton";
import { BaseButtonSection } from "../components/base/BaseButtonSection";
import { BaseContent } from "../components/base/BaseContent";
import { BaseContentGroup } from "../components/base/BaseContentGroup";
import { BaseContentHeader } from "../components/base/BaseContentHeader";
import { BaseContentLine } from "../components/base/BaseContentLine";
import { BaseHeader } from "../components/base/BaseHeader";
import { BaseMainSection } from "../components/base/BaseMainSection";
import { BasePageBody } from "../components/base/BasePageBody";
import { BaseTableCell } from "../components/base/BaseTableCell";
import { Flex, Image, Text } from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

import { BaseModal } from "../modal/BaseModal";
import { serviceFields } from "../static/modelFields";
import { BaseModalRow } from "../modal/BaseModalRow";
import { BaseModalInput } from "../modal/BaseModalInput";

export function Services() {
    // DATA GET
    const [services, setServices] = useState([]);
    const [updatingService, setUpdatingService] = useState(null);

    const inputRefs = useRef([]);

    useEffect(() => {
        getAllServices();
    }, []);

    useEffect(() => {
        if (updatingService) {
            inputRefs.current.map((input) => {
                input.value = updatingService[`${input.id}`];
            });
        }
    }, [updatingService]);

    const cleanInputs = () => {
        inputRefs.current.map((input) => {
            input.value = "";
        });
    };

    const getAllServices = () => {
        axios
            .get(`${API_URL}/service/view-analogic`)
            .then((res) => {
                setServices(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getServiceById = (id) => {
        axios
            .get(`${API_URL}/service/${id}`)
            .then((res) => {
                setUpdatingService(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // DATA POST
    const handleSave = (data) => {
        const updatedData = {};

        Object.keys(data).forEach((key) => {
            const value = data[key];
            const input = serviceFields.find((field) => field.id === key);

            if (input) {
                if (input.type === "number") {
                    updatedData[key] = isNaN(value) ? value : parseFloat(value);
                } else {
                    updatedData[key] = value;
                }
            }
        });

        if (updatingService) {
            axios
                .put(`${API_URL}/service/${updatingService.id}`, updatedData)
                .then((response) => {
                    console.log(
                        "Serviço atualizado com sucesso:",
                        response.data
                    );
                    setServices((prevServices) =>
                        prevServices.map((service) =>
                            service.id === updatingService.id
                                ? response.data
                                : service
                        )
                    );
                    setUpdatingService(null);
                    handleModalDisplay();
                })
                .catch((error) => {
                    console.error("Erro ao atualizar serviço:", error);
                    handleModalDisplay();
                });
        } else {
            axios
                .post(`${API_URL}/service`, updatedData)
                .then((response) => {
                    console.log("Serviço criado com sucesso:", response.data);
                    setServices((prevServices) => [
                        ...prevServices,
                        response.data,
                    ]);
                    handleModalDisplay();
                })
                .catch((error) => {
                    console.error("Erro ao criar serviço:", error);
                    handleModalDisplay();
                });
        }
    };

    // DATA PUT
    const handleUpdate = (id) => {
        handleModalDisplay();
        getServiceById(id);
    };

    // DATA DELETE
    const handleDelete = (id) => {
        axios
            .delete(`${API_URL}/service/${id}`)
            .then((response) => {
                console.log("Serviço removido com sucesso:");
                getAllServices();
            })
            .catch((error) => {
                console.error("Erro ao remover serviço:", error);
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
                <ServiceHeader />

                <BaseContentGroup>
                    <BaseContent>
                        <BaseContentHeader>
                            <BaseTableCell>Id</BaseTableCell>
                            <BaseTableCell customWidth={"15rem"}>
                                Nome
                            </BaseTableCell>
                            <BaseTableCell toGrown={true}>
                                Descrição
                            </BaseTableCell>
                            <BaseTableCell>Duração</BaseTableCell>
                            <BaseTableCell>Preço</BaseTableCell>
                            <BaseTableCell isLastChild={true}>
                                Ações
                            </BaseTableCell>
                        </BaseContentHeader>

                        {services.map((service, index) => (
                            <BaseContentLine
                                key={service.id}
                                isLastChild={index === services.length - 1}
                                customGap={"1.2rem"}
                            >
                                {Object.values(service).map((value, index) => (
                                    <BaseTableCell
                                        key={`${value} - ${index}`}
                                        toGrown={index === 2}
                                        customWidth={index === 1 && "15rem"}
                                    >
                                        {value}
                                    </BaseTableCell>
                                ))}
                                <BaseTableCell isLastChild={true}>
                                    {service.id != null && (
                                        <ActionsItems
                                            modelId={service.id}
                                            editCallback={handleUpdate}
                                            deleteCallback={handleDelete}
                                        />
                                    )}
                                </BaseTableCell>
                            </BaseContentLine>
                        ))}
                    </BaseContent>
                </BaseContentGroup>
            </BaseMainSection>

            <BaseButtonSection>
                <BaseModal
                    isOpen={isModalOpen}
                    title={"Novo Serviço"}
                    handleDisplayCallback={handleModalDisplay}
                    handleSaveCallback={handleSave}
                    inputRefs={inputRefs}
                >
                    {serviceFields.map((field, index) => (
                        <BaseModalRow key={field.id} customPy={"0"}>
                            <BaseModalInput
                                name={field.name}
                                id={field.id}
                                customType={field.type}
                                ref={(el) => (inputRefs.current[index] = el)}
                            />
                        </BaseModalRow>
                    ))}
                </BaseModal>

                <BaseButton
                    parentOnclickCalback={() => {
                        cleanInputs();
                        handleModalDisplay();
                    }}
                />
            </BaseButtonSection>
        </BasePageBody>
    );
}

function ServiceHeader() {
    return (
        <BaseHeader
            title={"Seus Serviços"}
            subtitle={
                "Aqui você pode ver todos os serviços cadastrados e adicionar novos."
            }
        />
    );
}

export function ActionsItems({ modelId, editCallback, deleteCallback }) {
    return (
        <Flex gap={"3rem"} justify={"end"}>
            <Image
                src="/src/assets/edit.svg"
                cursor={"pointer"}
                onClick={() => {
                    editCallback(modelId);
                }}
            />
            <Image
                src="/src/assets/delete.svg"
                cursor={"pointer"}
                onClick={() => {
                    deleteCallback(modelId);
                }}
            />
        </Flex>
    );
}
