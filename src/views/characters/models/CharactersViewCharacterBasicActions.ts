import { Character } from "@/core/plugins/store/entities"
import { Exclude, plainToInstance, Type } from 'class-transformer';

export default class MainViewCharacterBasicActions {
    private id: number;
    private name: string;
    private cost: number;
    private available: string;

    constructor(id: number, name: string, cost: number, available: string) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.available = available;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getCost() {
        return this.cost;
    }

    public getAvailable() {
        return this.available;
    }
}