import { Box, Flex, Text } from "@chakra-ui/react";

export function BaseHeader({ title, subtitle, children }) {
    return (
        <Flex
            as={"header"}
            w={"100%"}
            mb={"2rem"}
            justify={"space-between"}
            px={"2rem"}
        >
            <Box>
                <Text fontSize={"2.4rem"}>{title}</Text>

                <Text fontWeight={500} color={"var(--content-seconday)"}>
                    {subtitle}
                </Text>
            </Box>
            {children}
        </Flex>
    );
}
