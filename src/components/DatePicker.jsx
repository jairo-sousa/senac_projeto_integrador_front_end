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
            h={"100%"}
            w={"27rem"}
            justify={"space-between"}
            align={"center"}
            gap={"0.8rem"}
            backgroundColor={"var(--background-tertiary)"}
            borderRadius={"0.8rem"}
            p={"0 1.2rem 0 2rem"}
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
            w={"auto"}
            minWidth={"fit-content"}
            height={"fit-content"}
            lineHeight={"normal"}
            fontSize={"3rem"}
            fontWeight={500}
            color={"var(--content-seconday)"}
            background={"url(/src/assets/drop_down_arrow.svg)"}
            backgroundRepeat={"no-repeat"}
            backgroundPosition={"70%"}
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
