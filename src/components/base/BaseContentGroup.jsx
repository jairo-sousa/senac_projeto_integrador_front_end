import { Flex } from "@chakra-ui/react";

export function BaseContentGroup({ children }) {
    return (
        <Flex
            direction={"column"}
            flex={1}
            gap={"1.2rem"}
            overflowY={"scroll"}
            scrollbarWidth={"none"}
            css={{
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                "&": {
                    msOverflowStyle: "none",
                },
            }}
        >
            {children}
        </Flex>
    );
}
