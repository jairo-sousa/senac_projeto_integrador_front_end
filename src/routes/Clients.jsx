import { clientBlank } from "../static/clientBlank";
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
import { useEffect, useState } from "react";
import axios from "axios";

export function Clients() {
    // DATA
    const [clients, setClients] = useState(clientBlank);

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

    useEffect(() => {
        getAllClients();
    }, []);

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
                            <BaseTableCell>Estado</BaseTableCell>
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
                                    <ActionsItems />
                                </BaseTableCell>
                            </BaseContentLine>
                        ))}
                    </BaseContent>
                </BaseContentGroup>
            </BaseMainSection>

            <BaseButtonSection>
                <BaseButton>NOVO CLIENTE</BaseButton>
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

function ActionsItems() {
    return (
        <Flex gap={"3rem"} justify={"end"}>
            <Image src="/src/assets/edit.svg" cursor={"pointer"} />
            <Image src="/src/assets/delete.svg" cursor={"pointer"} />
        </Flex>
    );
}
