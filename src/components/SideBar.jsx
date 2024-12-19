import { Flex, Box, Text } from "@chakra-ui/react";
import { links } from "../router";
import { Logo } from "./Logo";

export function SideBar() {
    return (
        <SideBarBody>
            <Logo />

            <LinksUl>
                {links.map((link) => (
                    <LiLink
                        key={`${link.name} - ${links.indexOf(link.name)}`}
                        path={link.path}
                        bg={link.bg}
                        color={link.color}
                    >
                        <Text fontSize={"2rem"}>{link.name}</Text>
                    </LiLink>
                ))}
            </LinksUl>

            <Box
                backgroundColor={"var(--background-primary)"}
                w={"100%"}
                flex={0.5}
                borderRadius={"1rem 1rem 0 0"}
            />
        </SideBarBody>
    );
}

function SideBarBody({ children }) {
    return (
        <Flex
            justifyContent={"center"}
            minW={"37rem"}
            h={"100%"}
            backgroundColor={"var(--background-tertiary)"}
        >
            <Flex
                direction={"column"}
                alignItems={"center"}
                justifyContent={"start"}
                h={"100%"}
                w={"27rem"}
                gap={"2rem"}
            >
                {children}
            </Flex>
        </Flex>
    );
}

function Divider() {
    return (
        <Box borderTop={"0.1rem solid var(--content-primary)"} w={"70%"}></Box>
    );
}

function LinksUl({ children }) {
    return (
        <Flex as={"ul"} w={"100%"} gap={"2rem"} direction={"column"}>
            {children}
        </Flex>
    );
}

function LiLink({ bg, color, children, path }) {
    return (
        <Box as={"li"} w={"100%"} h={"6rem"}>
            <Flex
                align={"center"}
                justify={"center"}
                as={"a"}
                h={"100%"}
                href={path}
                textAlign={"center"}
                bgColor={bg}
                color={color}
                borderRadius={"1rem"}
            >
                {children}
            </Flex>
        </Box>
    );
}
