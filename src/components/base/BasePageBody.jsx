import { Flex } from "@chakra-ui/react";

export function BasePageBody({ children }) {
    return (
        <Flex
            as={"main"}
            align={"start"}
            p={"6rem 0 6rem 6rem"}
            h={"100vh"}
            w={"100%"}
        >
            {children}
        </Flex>
    );
}
