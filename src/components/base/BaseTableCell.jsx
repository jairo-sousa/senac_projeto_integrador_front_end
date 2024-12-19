import { BaseContentCell } from "./BaseContentCell";

export function BaseTableCell({ customWidth, isLastChild, toGrown, children }) {
    return (
        <BaseContentCell
            customWidth={customWidth || "12rem"}
            isLastChild={isLastChild}
            toGrown={toGrown}
        >
            {children}
        </BaseContentCell>
    );
}
