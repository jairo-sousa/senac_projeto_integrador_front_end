import { BasePageBody } from "../components/base/BasePageBody.jsx";
import { BaseMainSection } from "../components/base/BaseMainSection.jsx";

import { BaseContentGroup } from "../components/base/BaseContentGroup.jsx";

import { BaseButton } from "../components/base/BaseButton.jsx";
import { HomeHeader } from "../components/home/HomeHeader.jsx";
import { DayPhaseContent } from "../components/home/DayPhase.jsx";
import { BaseButtonSection } from "../components/base/BaseButtonSection.jsx";
import { useEffect, useState } from "react";

import { schedulingBlank } from "../static/schedulings.js";
import axios from "axios";
import { API_URL } from "../main";
import { dayPhases, getDayPhase } from "../static/dayPhases.js";
import { BaseContent } from "../components/base/BaseContent.jsx";
import { DayPhaseHeader } from "../components/home/DayPhaseHeader.jsx";
import { BaseContentLine } from "../components/base/BaseContentLine.jsx";
import { BaseContentCell } from "../components/base/BaseContentCell.jsx";

import { dateStringToTime } from "../conversions/dateStringToTime.js";
import { SchedulingCell } from "../components/home/SchedulingCell.jsx";

export function Home() {
    // DATA
    const [schedulings, setSchedulings] = useState(schedulingBlank);
    const [morningSchedulings, setMorningSchedulings] = useState([]);
    const [afternoonSchedulings, setAfternoonSchedulings] = useState([]);
    const [eveningSchedulings, setEveningSchedulings] = useState([]);

    const getAllSchedulings = (date) => {
        axios
            .get(`${API_URL}/scheduling/view-full/${date}`)
            .then((res) => {
                setSchedulings(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        const date = "2024-12-15";
        getAllSchedulings(date);
    }, []);

    useEffect(() => {
        if (schedulings && schedulings.length > 0) {
            setMorningSchedulings(
                schedulings.filter(
                    (scheduling) =>
                        getDayPhase(scheduling.date) === dayPhases.morning
                )
            );
            setAfternoonSchedulings(
                schedulings.filter(
                    (scheduling) =>
                        getDayPhase(scheduling.date) === dayPhases.afternoon
                )
            );
            setEveningSchedulings(
                schedulings.filter(
                    (scheduling) =>
                        getDayPhase(scheduling.date) === dayPhases.evening
                )
            );
        }
    }, [schedulings]);

    return (
        <BasePageBody>
            <BaseMainSection>
                <HomeHeader />

                <BaseContentGroup>
                    <DayPhaseContent
                        dayPhase={dayPhases.morning}
                        schedulings={morningSchedulings}
                    />

                    <DayPhaseContent
                        dayPhase={dayPhases.afternoon}
                        schedulings={afternoonSchedulings}
                    />

                    <DayPhaseContent
                        dayPhase={dayPhases.evening}
                        schedulings={eveningSchedulings}
                    />
                </BaseContentGroup>
            </BaseMainSection>

            <BaseButtonSection>
                <BaseButton>NOVO AGENDAMENTO</BaseButton>
            </BaseButtonSection>
        </BasePageBody>
    );
}
