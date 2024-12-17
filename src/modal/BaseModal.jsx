import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { BaseModalRow } from "./BaseModalRow";

export function BaseModal({ handleDisplayCallback, isOpen }) {
    return (
        <BaseModalWrapper
            isOpen={isOpen}
            handleDisplayCallback={handleDisplayCallback}
        >
            <BaseModalContainer>
                <BaseModalHeader>
                    <BaseModalTitle>Novo Serviço</BaseModalTitle>
                    <BaseModalCloseButon
                        handleDisplayCallback={handleDisplayCallback}
                    />
                </BaseModalHeader>

                <BaseModalBody>
                    Lorem ipsum dolor sit amet consectetur
                </BaseModalBody>

                <BaseModalFooter>
                    <BaseModalButton
                        // onClickCallBack={}
                        isModalAction={true}
                    >
                        Salvar
                    </BaseModalButton>
                    <BaseModalButton onClickCallBack={handleDisplayCallback}>
                        Fechar
                    </BaseModalButton>
                </BaseModalFooter>
            </BaseModalContainer>
        </BaseModalWrapper>
    );
}

function BaseModalWrapper({ handleDisplayCallback, isOpen, children }) {
    const handleWrapperClick = (event) => {
        if (event.target === event.currentTarget) {
            handleDisplayCallback();
        }
    };
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
    const handleContainerClick = (event) => {
        event.stopPropagation();
    };
    return (
        <Box
            w={"fit-content"}
            h={"fit-content"}
            minW={"44.6rem"}
            minH={"17.4rem"}
            px={"2.4rem"}
            bgColor={"var(--background-tertiary)"}
            borderRadius={"0.8rem"}
            onClick={handleContainerClick}
        >
            {children}
        </Box>
    );
}

function BaseModalHeader({ children }) {
    return <BaseModalRow>{children}</BaseModalRow>;
}

function BaseModalTitle({ children }) {
    return (
        <Text fontSize={"2rem"} fontWeight={600}>
            {children}
        </Text>
    );
}

function BaseModalCloseButon({ handleDisplayCallback }) {
    return (
        <Box
            as={"img"}
            src="/src/assets/cross.svg"
            h={"1.2rem"}
            onClick={handleDisplayCallback}
        />
    );
}

function BaseModalBody({ children }) {
    return (
        <BaseModalRow
            customFontSize={"1.6rem"}
            customFontWheight={400}
            customPy={"0.8rem"}
        >
            {children}
        </BaseModalRow>
    );
}

function BaseModalFooter({ children }) {
    return (
        <BaseModalRow customGap={"2.8rem"} customJustfy={"end"}>
            {children}
        </BaseModalRow>
    );
}

function BaseModalButton({ isModalAction, onClickCallBack, children }) {
    return (
        <Button
            w={"fit-content"}
            h={"4.406rem"}
            bgColor={isModalAction ? "var(--content-brand)" : "#2e3334"}
            color={
                isModalAction
                    ? "var(--content-brand-contrast)"
                    : "var(--content-primary)"
            }
            fontWeight={"bold"}
            fontSize={"1.55rem"}
            borderRadius={"0.8rem"}
            px={"1.6rem"}
            onClick={onClickCallBack}
        >
            {children}
        </Button>
    );
}
