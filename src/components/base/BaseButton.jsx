import { Button } from "@chakra-ui/react";

export function BaseButton({ parentOnclickCalback, children }) {
    return (
        <Button
            w={"fit-content"}
            h={"4.8rem"}
            bg={"var(--content-brand)"}
            color={"var(--content-brand-contrast)"}
            fontWeight={"bold"}
            fontSize={"1.6rem"}
            borderRadius={"0.8rem"}
            p={"0 2.1rem"}
            filter={"drop-shadow(0 0 0.4rem var(--content-brand-shadow));"}
            onClick={parentOnclickCalback}
        >
            {children}
        </Button>
    );
}
