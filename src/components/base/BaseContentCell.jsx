import { Box } from "@chakra-ui/react";

export function BaseContentCell({
    customWidth,
    light,
    secondaryColor,
    isLastChild,
    children,
    toGrown,
}) {
    return (
        <Box
            fontSize={"2rem"}
            fontWeight={light && 500}
            w={customWidth || "6rem"}
            minH={"fit-content"}
            color={secondaryColor && "var(--content-tertiary)"}
            textAlign={isLastChild && "end"}
            flex={toGrown && 1}
        >
            {children}
        </Box>
    );
}
