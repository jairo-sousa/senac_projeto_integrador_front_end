import { Box, Flex } from "@chakra-ui/react";

export function BaseContentHeader({ children }) {
    return (
        <Box borderBottom={"1px solid var(--border-divisor)"} w={"100%"}>
            <Flex
                gap={"1.2rem"}
                align={"start"}
                paddingBottom={"1.2rem"}
                px={"2rem"}
            >
                {children}
            </Flex>
        </Box>
    );
}
