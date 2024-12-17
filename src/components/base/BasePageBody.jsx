import { Flex } from "@chakra-ui/react";

export function BasePageBody({ children }) {
    return (
        <Flex
            as={"main"}
            align={"start"}
            p={"6rem 6rem 4.8rem 6rem"}
            h={"100vh"}
            w={"100%"}
            gap={"4.8rem"}
        >
            {children}
        </Flex>
    );
}
