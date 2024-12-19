import { Flex } from "@chakra-ui/react";

export function BaseButtonSection({ children }) {
    return (
        <Flex
            h={"100%"}
            w={"37rem"}
            justify={"center"}
            align={"end"}
            position={"inherit"}
        >
            {children}
        </Flex>
    );
}
