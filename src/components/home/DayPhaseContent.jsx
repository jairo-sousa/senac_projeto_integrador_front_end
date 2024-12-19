import { Box, Flex, Text } from "@chakra-ui/react";
import { dateStringToTime } from "../../conversions/dateStringToTime";
import { BaseContent } from "../base/BaseContent";
import { BaseContentCell } from "../base/BaseContentCell";
import { BaseContentLine } from "../base/BaseContentLine";
import { DayPhaseHeader } from "./DayPhaseHeader";
import { SchedulingCell } from "./SchedulingCell";
import { ActionsItems } from "../../routes/Services";

export function DayPhaseContent({
    editCallback,
    deleteCallback,
    schedulings,
    dayPhase,
}) {
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
                        <ActionsItems
                            modelId={scheduling.id}
                            editCallback={() => {
                                editCallback(scheduling.id);
                            }}
                            deleteCallback={deleteCallback}
                        >
                            <Text>{scheduling.status}</Text>
                        </ActionsItems>
                    </BaseContentCell>
                </BaseContentLine>
            ))}
        </BaseContent>
    );
}

// function ActionsItems({ children }) {
//     return (
//         <Flex gap={"3rem"} justify={"end"} fontSize={"1.2rem"} fontWeight={400}>
//             {children}
//             <Box as={"img"} src="/src/assets/edit.svg" cursor={"pointer"} />
//             <Box as={"img"} src="/src/assets/delete.svg" cursor={"pointer"} />
//         </Flex>
//     );
// }
