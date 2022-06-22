import { Expose, Type } from "class-transformer"
import "reflect-metadata"

export default class CharacterActionCard {
    public id!: number
    public name!: string
    public systemName!: string
    public cost!: number
    public available!: CharacterActionCardAvailable
    public interruption!: boolean
    public fullImageLink!: string
    @Type(() => CharacterActionCardValue)
    public values!: CharacterActionCardValue[]

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getSystemName() {
        return this.systemName
    }

    public getCost() {
        return this.cost
    }

    public getAvailable() {
        return this.available
    }

    public getInterruption() {
        return this.interruption
    }

    public getFullImageLink() {
        return this.fullImageLink
    }
}


export class CharacterActionCardValue {
    public id!: number
    public name!: string
    public description!: string
}

export type CharacterActionCards = CharacterActionCard[];

enum CharacterActionCardAvailable {
    OUTOFCOMBAT,
    INCOMBAT,
    ALWAYS
}