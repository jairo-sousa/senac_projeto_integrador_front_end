import { useRouteError } from "react-router";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

export function ErrorPage() {
    const error = useRouteError();

    return (
        <Flex
            id="errorPage"
            justify={"center"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            gap={"1.2rem"}
            backgroundImage={"url(/src/assets/space.svg)"}
            backgroundSize={"cover"}
            backgroundRepeat={"no-repeat"}
        >
            <Flex direction={"column"} align={"center"}>
                <Text fontSize={"7.2rem"} fontWeight={"700"}>
                    Oops!
                </Text>
                <Text fontSize={"2.4rem"} fontWeight={"400"}>
                    Desculpe, Ocorreu um erro inesperado.
                </Text>
                {error && <Text>{error.statusText || error.message}</Text>}
            </Flex>
        </Flex>
    );
}
