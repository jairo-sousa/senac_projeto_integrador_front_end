import { Box, Flex } from "@chakra-ui/react";
import { dateStringToTime } from "../../conversions/dateStringToTime";
import { BaseContent } from "../base/BaseContent";
import { BaseContentCell } from "../base/BaseContentCell";
import { BaseContentLine } from "../base/BaseContentLine";
import { DayPhaseHeader } from "./DayPhaseHeader";
import { SchedulingCell } from "./SchedulingCell";

export function DayPhaseContent({ schedulings, dayPhase }) {
    return (
        <BaseContent>
            <DayPhaseHeader dayPhase={dayPhase} />
            {schedulings.map((scheduling, index) => (
                <BaseContentLine
                    key={`${scheduling.date}-${schedulings.indexOf(
                        scheduling
                    )}`}
                    isLastChild={index === schedulings.length - 1}
                >
                    <BaseContentCell>
                        {dateStringToTime(scheduling.date)}
                    </BaseContentCell>

                    <BaseContentCell customWidth={"9rem"}>
                        {scheduling.client}
                    </BaseContentCell>

                    {scheduling.services.map((service) => (
                        <SchedulingCell
                            key={`${service}-${scheduling.services.indexOf(
                                service
                            )}`}
                        >
                            {service}
                        </SchedulingCell>
                    ))}

                    <BaseContentCell isLastChild={true} toGrown={true}>
                        <ActionsItems />
                    </BaseContentCell>
                </BaseContentLine>
            ))}
        </BaseContent>
    );
}

export function ActionsItems() {
    return (
        <Flex gap={"3rem"} justify={"end"}>
            <Box as={"img"} src="/src/assets/edit.svg" cursor={"pointer"} />
            <Box as={"img"} src="/src/assets/delete.svg" cursor={"pointer"} />
        </Flex>
    );
}
