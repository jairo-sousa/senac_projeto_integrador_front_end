import { Flex, Image, Input } from "@chakra-ui/react";
import { useState } from "react";

export function DatePicker({ selectedDate, onDateChange }) {
    const handleDateChange = (event) => {
        onDateChange(event.target.value);
    };

    return (
        <DatePickerBody>
            <Image src="/src/assets/calendar.svg" h={"1.9rem"} />
            <DatePickerInput value={selectedDate} onChange={handleDateChange} />
        </DatePickerBody>
    );
}

function DatePickerBody({ children }) {
    return (
        <Flex
            position={"relative"}
            h={"4.8rem"}
            justify={"space-between"}
            align={"center"}
            gap={"0.8rem"}
            border={"1px solid var(--border-primary)"}
            borderRadius={"0.8rem"}
            p={"1.2rem 1.2rem 1.2rem 1.6rem"}
        >
            {children}
        </Flex>
    );
}

function DatePickerInput({ value, onChange }) {
    return (
        <Input
            type="date"
            border={"none"}
            outline={"none"}
            w={"13.5rem"}
            fontSize={"1.6rem"}
            fontWeight={400}
            color={"var(--content-seconday)"}
            background={"url(/src/assets/drop_down_arrow.svg)"}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"95%"}
            padding={0}
            position={"relative"}
            css={{
                "&::-webkit-calendar-picker-indicator": {
                    opacity: 0,
                    zIndex: 1,
                },
            }}
            value={value}
            onChange={onChange}
        />
    );
}
