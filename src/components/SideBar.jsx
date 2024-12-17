import { Flex, Box, Span } from "@chakra-ui/react";
import { links } from "../router";

export function SideBar() {
    return (
        <SideBarBody>
            <Logo />

            <Divider />

            <LinksUl>
                {links.map((link) => (
                    <LiLink
                        key={`${link.name} - ${links.indexOf(link.name)}`}
                        path={link.path}
                    >
                        {link.name}
                    </LiLink>
                ))}
            </LinksUl>
        </SideBarBody>
    );
}

function SideBarBody({ children }) {
    return (
        <Flex
            direction={"column"}
            align={"center"}
            minW={"18.3rem"}
            backgroundColor={"var(--background-tertiary)"}
            h={"100%"}
            p={"1.2rem 2rem"}
            gap={"1.5rem"}
        >
            {children}
        </Flex>
    );
}

function Divider() {
    return (
        <Box borderTop={"0.1rem solid var(--content-primary)"} w={"70%"}></Box>
    );
}

function Logo() {
    return (
        <Box color={"var(--content-brand)"}>
            <Span>MINHA MANICURE</Span>
        </Box>
    );
}

function LinksUl({ children }) {
    return (
        <Flex as={"ul"} w={"100%"} gap={"2.4rem"} direction={"column"}>
            {children}
        </Flex>
    );
}

function LiLink({ children, path }) {
    return (
        <Box as={"li"} w={"100%"}>
            <Box as={"a"} href={path}>
                {children}
            </Box>
        </Box>
    );
}
