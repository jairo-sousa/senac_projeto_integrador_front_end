import { Box, Flex, Text } from "@chakra-ui/react";

export function BaseModal({ handleDisplayCallback, isOpen }) {
    return (
        <BaseModalWrapper
            isOpen={isOpen}
            handleDisplayCallback={handleDisplayCallback}
        >
            <BaseModalContainer>
                <BaseModalHeader>
                    <BaseModalTitle>Novo Serviço</BaseModalTitle>
                    <BaseModalCloseButon />
                </BaseModalHeader>
            </BaseModalContainer>
        </BaseModalWrapper>
    );
}

function BaseModalWrapper({ handleDisplayCallback, isOpen, children }) {
    return (
        <Box
            w={"100%"}
            h={"100vh"}
            pos={"absolute"}
            left={0}
            top={0}
            zIndex={1}
            backgroundColor={"#00000029"}
            backdropFilter="blur(10px)"
            onClick={handleDisplayCallback}
            display={isOpen ? "flex" : "none"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            {children}
        </Box>
    );
}

function BaseModalContainer({ children }) {
    return (
        <Box
            w={"fit-content"}
            h={"fit-content"}
            minW={"44.6rem"}
            minH={"17.4rem"}
            padding={"0 2.4rem"}
            bgColor={"var(--background-tertiary)"}
            borderRadius={"0.8rem"}
        >
            {children}
        </Box>
    );
}

function BaseModalHeader({ children }) {
    return (
        <Flex
            w={"100%"}
            h={"fit-content"}
            justify={"space-between"}
            p={"1.6rem 0"}
        >
            {children}
        </Flex>
    );
}

function BaseModalTitle({ children }) {
    return <Text fontSize={"2rem"}>{children}</Text>;
}

function BaseModalCloseButon() {
    return <Box as={"img"} src="/src/assets/cross.svg" h={"1.2rem"} />;
}
