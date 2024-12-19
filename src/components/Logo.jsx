import { Box, Flex, Image, Span } from "@chakra-ui/react";

export function Logo() {
    return (
        <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            backgroundColor={"var(--background-primary)"}
            w={"100%"}
            flex={1}
            borderRadius={"0 0 1rem 1rem"}
        >
            <Image src="/src/assets/logo_image.png" h={"28.5rem"} />
        </Flex>
    );
}
