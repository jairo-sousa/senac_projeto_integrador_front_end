import { BaseHeader } from "../base/BaseHeader";
import { DatePicker } from "../DatePicker";

export function HomeHeader() {
    return (
        <BaseHeader
            title={"Sua agenda"}
            subtitle={
                "Aqui você pode ver todos os clientes e serviços agendados para hoje."
            }
        >
            <DatePicker />
        </BaseHeader>
    );
}
