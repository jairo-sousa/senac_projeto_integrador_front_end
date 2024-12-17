import { BasePageBody } from "../components/base/BasePageBody.jsx";
import { BaseMainSection } from "../components/base/BaseMainSection.jsx";

import { BaseContentGroup } from "../components/base/BaseContentGroup.jsx";

import { BaseButton } from "../components/base/BaseButton.jsx";
import { HomeHeader } from "../components/home/HomeHeader.jsx";
import { DayPhaseContent } from "../components/home/DayPhaseContent.jsx";
import { BaseButtonSection } from "../components/base/BaseButtonSection.jsx";
import { useEffect, useState } from "react";

import axios from "axios";
import { API_URL } from "../main";
import { dayPhases, getDayPhase } from "../static/dayPhases.js";

export function Home() {
    // DATE
    const [selectedDate, setSelectedDate] = useState(getTodayDate());

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    // DATA
    const [schedulings, setSchedulings] = useState([]);

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
        const date = selectedDate;
        getAllSchedulings(date);
    }, [selectedDate]);

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
    }, [selectedDate, schedulings]);

    return (
        <BasePageBody>
            <BaseMainSection>
                <HomeHeader
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                />

                <BaseContentGroup>
                    {/* <p>{schedulings.length}</p> */}
                    {Array.isArray(morningSchedulings) &&
                        morningSchedulings.length > 0 &&
                        schedulings.length > 0 && (
                            <DayPhaseContent
                                key={`morning-${selectedDate}`}
                                dayPhase={dayPhases.morning}
                                schedulings={morningSchedulings}
                            />
                        )}

                    {Array.isArray(afternoonSchedulings) &&
                        afternoonSchedulings.length > 0 &&
                        schedulings.length > 0 && (
                            <DayPhaseContent
                                key={`afternoon-${selectedDate}`}
                                dayPhase={dayPhases.afternoon}
                                schedulings={afternoonSchedulings}
                            />
                        )}

                    {Array.isArray(eveningSchedulings) &&
                        eveningSchedulings.length > 0 &&
                        schedulings.length > 0 && (
                            <DayPhaseContent
                                key={`evening-${selectedDate}`}
                                dayPhase={dayPhases.evening}
                                schedulings={eveningSchedulings}
                            />
                        )}
                </BaseContentGroup>
            </BaseMainSection>

            <BaseButtonSection>
                <BaseButton>NOVO AGENDAMENTO</BaseButton>
            </BaseButtonSection>
        </BasePageBody>
    );
}

function getTodayDate() {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
}
