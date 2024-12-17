import { Flex } from "@chakra-ui/react";

export function BaseContentLine({ customGap, isLastChild, children }) {
    return (
        <Flex
            w={"calc(100% - 4rem)"}
            h={"4.8rem"}
            minH={"fit-content"}
            p={"1.6rem 0 1.6rem 0 "}
            borderBottom={
                isLastChild ? "none" : "1px solid var(--border-divisor)"
            }
            gap={customGap || "1.6rem"}
        >
            {children}
        </Flex>
    );
}
