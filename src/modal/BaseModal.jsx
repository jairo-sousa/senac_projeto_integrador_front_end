import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { BaseModalRow } from "./BaseModalRow";
import { useRef } from "react";

export function BaseModal({
    handleDisplayCallback,
    handleSaveCallback,
    inputRefs,
    isOpen,
    title,
    children,
}) {
    function getInputValues() {
        const data = {};

        inputRefs.current.forEach((input, index) => {
            if (input) {
                data[input.id] = input.value;
                input.value = "";
            }
        });

        handleSaveCallback(data);
    }

    return (
        <BaseModalWrapper
            isOpen={isOpen}
            handleDisplayCallback={handleDisplayCallback}
        >
            <BaseModalContainer>
                <BaseModalHeader>
                    <BaseModalTitle>{title}</BaseModalTitle>
                    <BaseModalCloseButon
                        handleDisplayCallback={handleDisplayCallback}
                    />
                </BaseModalHeader>

                <BaseModalBody>{children}</BaseModalBody>

                <BaseModalFooter>
                    <BaseModalButton
                        onClickCallBack={getInputValues}
                        isModalAction={true}
                    >
                        Salvar
                    </BaseModalButton>
                    <BaseModalButton onClickCallBack={handleDisplayCallback}>
                        Cancelar
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
            pt={"6.4rem"}
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
            maxH={"85vh"}
            minW={"44.6rem"}
            minH={"17.4rem"}
            px={"2.4rem"}
            bgColor={"var(--background-tertiary)"}
            borderRadius={"0.8rem"}
            onClick={handleContainerClick}
            overflowY={"scroll"}
            scrollbarWidth={"none"}
            css={{
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                "&": {
                    msOverflowStyle: "none",
                },
            }}
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
        <Flex
            w={"100%"}
            h={"fit-content"}
            justify={"space-between"}
            py={"0.8rem 2.4rem"}
            direction={"column"}
            gap={"1.6rem"}
        >
            {children}
        </Flex>
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
