import { Center, Flex } from "@chakra-ui/react";

export function BaseContent({ children }) {
    return (
        <Flex
            direction={"column"}
            align={"Center"}
            w={"100%"}
            bgColor={"var(--background-secondary)"}
            borderRadius={"1rem"}
            padding={"2rem 0"}
        >
            {children}
        </Flex>
    );
}
