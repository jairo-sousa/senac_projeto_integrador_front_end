import { Flex } from "@chakra-ui/react";

export function BaseButtonSection({ children }) {
    return (
        <Flex h={"100%"} w={"fit-content"} align={"end"} position={"inherit"}>
            {children}
        </Flex>
    );
}
