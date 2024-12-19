import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { BaseContentHeader } from "../base/BaseContentHeader";

export function DayPhaseHeader({ dayPhase }) {
    return (
        <BaseContentHeader>
            <Image src={dayPhase.icon} h={"3rem"} />

            <Text flex={1} fontSize={"2rem"}>
                {dayPhase.phase}
            </Text>

            <Flex color={"var(--content-seconday)"} align={"center"}>
                <Text fontSize={"2rem"}>{dayPhase.period}</Text>
            </Flex>
        </BaseContentHeader>
    );
}
