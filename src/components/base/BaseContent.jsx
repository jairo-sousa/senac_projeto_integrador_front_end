import { Center, Flex } from "@chakra-ui/react";

export function BaseContent({ children }) {
    return (
        <Flex
            direction={"column"}
            align={"Center"}
            w={"100%"}
            bgColor={"var(--background-tertiary)"}
            borderRadius={"1.5rem"}
            padding={"2rem 0"}
        >
            {children}
        </Flex>
    );
}
