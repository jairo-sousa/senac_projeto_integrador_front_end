import { Box, Button } from "@chakra-ui/react";

export function BaseButton({ parentOnclickCalback }) {
    return (
        <Button
            w={"11.8rem"}
            h={"11.8rem"}
            bg={"var(--background-tertiary)"}
            borderRadius={"50%"}
            filter={"drop-shadow(0 0 0.4rem var(--content-brand-shadow));"}
            onClick={parentOnclickCalback}
            position={"relative"}
        >
            <Box
                w={"2rem"}
                borderRadius={"0.6rem"}
                h={"7.5rem"}
                bgColor={"#f6b9c6"}
            />
            <Box
                w={"2rem"}
                borderRadius={"0.6rem"}
                h={"7.5rem"}
                bgColor={"#f6b9c6"}
                transform={"rotate(90deg)"}
                position={"absolute"}
            />
        </Button>
    );
}
