import { Box, Image, Text } from "@chakra-ui/react";
import { BaseContentHeader } from "../base/BaseContentHeader";

export function DayPhaseHeader({ dayPhase }) {
    return (
        <BaseContentHeader>
            <Image src={dayPhase.icon} h={"1.9rem"} />
            <Text flex={1}>{dayPhase.phase}</Text>
            <Box color={"var(--content-seconday)"}>{dayPhase.period}</Box>
        </BaseContentHeader>
    );
}
