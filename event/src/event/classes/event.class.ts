import { GeneralCondition } from "../../event/types/general-condition.type"

export class Event {

    eventId?: string;
    condition: GeneralCondition;
    startAt: string;
    endAt: string;
    activated: boolean;

    createdAt?: string;
    updatedAt?: string;

    constructor(condition: GeneralCondition, startAt: string, endAt: string, activated: boolean, createdAt?: string, updatedAt?: string, eventId?: string) {
        this.eventId = eventId;
        this.condition = condition;
        this.startAt = startAt;
        this.endAt = endAt;
        this.activated = activated;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}