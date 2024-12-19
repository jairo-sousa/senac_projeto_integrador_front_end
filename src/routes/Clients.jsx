import { API_URL } from "../main";

import { BasePageBody } from "../components/base/BasePageBody";
import { BaseHeader } from "../components/base/BaseHeader";
import { BaseMainSection } from "../components/base/BaseMainSection";
import { BaseButton } from "../components/base/BaseButton";
import { BaseButtonSection } from "../components/base/BaseButtonSection";
import { BaseContentGroup } from "../components/base/BaseContentGroup";
import { BaseContent } from "../components/base/BaseContent";
import { BaseContentHeader } from "../components/base/BaseContentHeader";
import { BaseContentLine } from "../components/base/BaseContentLine";
import { BaseTableCell } from "../components/base/BaseTableCell";
import { Flex, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { clientFields } from "../static/modelFields";
import { BaseModalRow } from "../modal/BaseModalRow";
import { BaseModalInput } from "../modal/BaseModalInput";
import { BaseModal } from "../modal/BaseModal";

import { ActionsItems } from "./Services";

export function Clients() {
    // DATA GET
    const [clients, setClients] = useState([]);
    const [updatingClient, setUpdatingClient] = useState(null);

    const inputRefs = useRef([]);

    const getAllClients = () => {
        axios
            .get(`${API_URL}/client/view-simple`)
            .then((res) => {
                setClients(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getClientById = (id) => {
        axios
            .get(`${API_URL}/client/${id}`)
            .then((res) => {
                setUpdatingClient(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const cleanInputs = () => {
        inputRefs.current.map((input) => {
            input.value = "";
        });
    };

    // DATA POST
    const handleSave = (data) => {
        const updatedData = {};

        Object.keys(data).forEach((key) => {
            const value = data[key];
            const input = clientFields.find((field) => field.id === key);

            if (input) {
                if (input.type === "number") {
                    updatedData[key] = isNaN(value) ? value : parseFloat(value);
                } else if (input.type === "date") {
                    updatedData[key] = `${value}T10:00:00.000Z`;
                } else {
                    updatedData[key] = value;
                }
            }
        });

        if (updatingClient) {
            axios
                .put(`${API_URL}/client/${updatingClient.id}`, updatedData)
                .then((response) => {
                    console.log(
                        "Cliente atualizado com sucesso:",
                        response.data
                    );
                    getAllClients();
                    setUpdatingClient(null);
                    handleModalDisplay();
                })
                .catch((error) => {
                    console.error("Erro ao atualizar cliente:", error);
                    handleModalDisplay();
                });
        } else {
            axios
                .post(`${API_URL}/client`, updatedData)
                .then((response) => {
                    console.log("cliente criado com sucesso:", response.data);
                    setClients((prevClients) => [
                        ...prevClients,
                        response.data,
                    ]);
                    handleModalDisplay();
                })
                .catch((error) => {
                    console.error("Erro ao cadastrar cliente:", error);
                    handleModalDisplay();
                });
        }
    };

    // DATA PUT
    const handleUpdate = (id) => {
        handleModalDisplay();
        getClientById(id);
    };

    // DATA DELETE
    const handleDelete = (id) => {
        axios
            .delete(`${API_URL}/client/${id}`)
            .then((response) => {
                console.log("cliente removido com sucesso:");
                getAllClients();
            })
            .catch((error) => {
                console.error("Erro ao remover cliente:", error);
            });
    };

    // MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalDisplay = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        getAllClients();
    }, []);

    useEffect(() => {
        if (updatingClient) {
            inputRefs.current.map((input) => {
                if (input.type === "date") {
                    const date = updatingClient[`${input.id}`]?.split("T")[0];
                    input.value = date;
                } else {
                    input.value = updatingClient[`${input.id}`];
                }
            });
        }
    }, [updatingClient]);

    return (
        <BasePageBody>
            <BaseMainSection>
                <ClientHeader />

                <BaseContentGroup>
                    <BaseContent>
                        <BaseContentHeader>
                            <BaseTableCell>Id</BaseTableCell>
                            <BaseTableCell>Nome</BaseTableCell>
                            <BaseTableCell>Nascimento</BaseTableCell>
                            <BaseTableCell>Telefone</BaseTableCell>
                            <BaseTableCell>Rua</BaseTableCell>
                            <BaseTableCell>Bairro</BaseTableCell>
                            <BaseTableCell>Cidade</BaseTableCell>
                            <BaseTableCell customWidth={"8rem"}>
                                Estado
                            </BaseTableCell>
                            <BaseTableCell isLastChild={true} toGrown={true}>
                                Ações
                            </BaseTableCell>
                        </BaseContentHeader>

                        {clients.map((client, index) => (
                            <BaseContentLine
                                key={client.id}
                                isLastChild={index === clients.length - 1}
                                customGap={"1.2rem"}
                            >
                                {Object.values(client).map((value, index) => (
                                    <BaseTableCell key={`${value} - ${index}`}>
                                        {value}
                                    </BaseTableCell>
                                ))}
                                <BaseTableCell
                                    isLastChild={true}
                                    toGrown={true}
                                >
                                    <ActionsItems
                                        modelId={client.id}
                                        editCallback={handleUpdate}
                                        deleteCallback={handleDelete}
                                    />
                                </BaseTableCell>
                            </BaseContentLine>
                        ))}
                    </BaseContent>
                </BaseContentGroup>
            </BaseMainSection>

            <BaseButtonSection>
                <BaseModal
                    isOpen={isModalOpen}
                    title={updatingClient ? "Editar Cliente" : "Novo Cliente"}
                    handleDisplayCallback={handleModalDisplay}
                    handleSaveCallback={handleSave}
                    inputRefs={inputRefs}
                >
                    {clientFields.map((field, index) => (
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
                        setUpdatingClient(null);
                        cleanInputs();
                        handleModalDisplay();
                    }}
                />
            </BaseButtonSection>
        </BasePageBody>
    );
}

function ClientHeader() {
    return (
        <BaseHeader
            title={"Seus Clientes"}
            subtitle={
                "Aqui você pode ver todos os clientes cadastrados e adicionar novos."
            }
        />
    );
}
