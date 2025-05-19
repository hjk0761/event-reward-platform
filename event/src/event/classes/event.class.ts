import { GeneralCondition } from "../../event/types/general-condition.type"

export class Event {

    eventId: number;
    condition: GeneralCondition;
    startAt: string;
    endAt: string;
    activated: boolean;

    createdAt?: string;
    updatedAt?: string;

    constructor(eventId: number, condition: GeneralCondition, startAt: string, endAt: string, activated: boolean, createdAt?: string, updatedAt?: string) {
        this.eventId = eventId;
        this.condition = condition;
        this.startAt = startAt;
        this.endAt = endAt;
        this.activated = activated;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}