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
import { Flex, Image } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { BaseModal } from "../modal/BaseModal";

export function Services() {
    // DATA
    const [services, setServices] = useState([]);

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

    useEffect(() => {
        getAllServices();
    }, []);

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
                                    {service.id != null && <ActionsItems />}
                                </BaseTableCell>
                            </BaseContentLine>
                        ))}
                    </BaseContent>
                </BaseContentGroup>
            </BaseMainSection>

            <BaseButtonSection>
                <BaseModal
                    isOpen={isModalOpen}
                    handleDisplayCallback={handleModalDisplay}
                />
                <BaseButton parentOnclickCalback={handleModalDisplay}>
                    NOVO SERVIÇO
                </BaseButton>
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

function ActionsItems() {
    return (
        <Flex gap={"3rem"} justify={"end"}>
            <Image src="/src/assets/edit.svg" cursor={"pointer"} />
            <Image src="/src/assets/delete.svg" cursor={"pointer"} />
        </Flex>
    );
}
