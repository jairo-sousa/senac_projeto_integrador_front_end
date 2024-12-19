import { Box, Flex, Text } from "@chakra-ui/react";

export function BaseHeader({ title, subtitle, children }) {
    return (
        <Flex direction={"column"} as={"header"} w={"100%"} gap={"2rem"}>
            <Flex w={"100%"} gap={"8rem"}>
                <Flex
                    flex={1}
                    align={"center"}
                    justify={"center"}
                    color={"var(--content-seconday)"}
                    backgroundColor={"var(--background-tertiary)"}
                    p={"1rem 2rem"}
                    h={"10rem"}
                    minH={"fit-content"}
                    borderRadius={"1.5rem"}
                >
                    <Text fontSize={"4rem"} fontWeight={600}>
                        {title}
                    </Text>
                </Flex>

                {children}
            </Flex>

            <Flex
                align={"center"}
                color={"var(--content-seconday)"}
                backgroundColor={"var(--background-tertiary)"}
                p={"1rem 2rem"}
                h={"6rem"}
                minH={"fit-content"}
                borderRadius={"1.5rem"}
            >
                <Text fontWeight={500} fontSize={"2.8rem"}>
                    {subtitle}
                </Text>
            </Flex>
        </Flex>
    );
}
