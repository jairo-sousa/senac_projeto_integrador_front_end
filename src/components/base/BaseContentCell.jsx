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
            fontSize={"1.2rem"}
            fontWeight={light && 400}
            w={customWidth || "4.5rem"}
            minH={"fit-content"}
            color={secondaryColor && "var(--content-secondary)"}
            textAlign={isLastChild && "end"}
            flex={toGrown && 1}
        >
            {children}
        </Box>
    );
}
