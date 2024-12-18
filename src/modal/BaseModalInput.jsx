import { Box, Flex, Input } from "@chakra-ui/react";
import React, { forwardRef } from "react";

export const BaseModalInput = forwardRef(
    ({ name, id, customType, children, onchangeCalback }, ref) => {
        return (
            <Flex
                as={"fieldset"}
                direction={"column"}
                gap={"0.8rem"}
                w={"100%"}
            >
                <Box as={"label"} fontWeight={500}>
                    {name}
                </Box>
                {customType === "select" ? (
                    <Box
                        as={"select"}
                        name={name}
                        id={id}
                        ref={ref}
                        fontSize={"inherit"}
                        px={"1.6rem"}
                        h={"4rem"}
                        borderRadius={"0.6rem"}
                        border={"1px solid var(--content-brand-shadow)"}
                        color={"var(--content-secondary)"}
                        bgColor={"inherit"}
                        fontWeight={400}
                        onChange={onchangeCalback}
                    >
                        {children}
                    </Box>
                ) : (
                    <Input
                        name={name}
                        id={id}
                        ref={ref}
                        type={customType || "text"}
                        placeholder={name}
                        fontSize={"inherit"}
                        px={"1.6rem"}
                        h={"4rem"}
                        borderRadius={"0.6rem"}
                        border={"1px solid var(--content-brand-shadow)"}
                        color={"var(--content-secondary)"}
                        fontWeight={400}
                        onChange={onchangeCalback}
                    />
                )}
            </Flex>
        );
    }
);
