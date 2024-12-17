import { Flex } from "@chakra-ui/react";

export function BaseMainSection({ children }) {
    return (
        <Flex gap={"1.2rem"} flex={1} direction={"column"} h={"100%"}>
            {children}
        </Flex>
    );
}
