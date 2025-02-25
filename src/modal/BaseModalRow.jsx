import { Flex } from "@chakra-ui/react";

export function BaseModalRow({
    customJustfy,
    customFontSize,
    customFontWheight,
    customPy,
    customGap,
    customDirection,
    children,
}) {
    return (
        <Flex
            w={"100%"}
            h={"fit-content"}
            justify={"space-between"}
            py={customPy || "1.6rem"}
            justifyContent={customJustfy}
            fontSize={customFontSize}
            fontWeight={customFontWheight}
            gap={customGap}
            direction={customDirection}
        >
            {children}
        </Flex>
    );
}
