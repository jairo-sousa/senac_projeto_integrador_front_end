import { BaseContentCell } from "../base/BaseContentCell";

export function SchedulingCell({ children }) {
    return (
        <BaseContentCell
            customWidth={"fit-content"}
            secondaryColor={true}
            light={true}
        >
            {children}
        </BaseContentCell>
    );
}
