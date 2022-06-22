import { Character } from "@/core/plugins/store/models"
import { Exclude, plainToInstance, Type } from 'class-transformer';

export default class MainViewCharacter {
    public id!: number;
    public name!: string;
    public systemName!: string;
    public color!: string;
    public fullImageLink!: string;
    public miniImageLink!: string;
    
    @Exclude()
    private selected: boolean = false;

    // constructor(id: number, name: string, color: string, fullImageLink: string, miniImageLink: string) {
    //     this.id = id;
    //     this.name = name;
    //     this.color = color;
    //     this.fullImageLink = fullImageLink;
    //     this.miniImageLink = miniImageLink;
    // }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getSystemName() {
        return this.systemName;
    }

    public getColor() {
        return this.color;
    }

    public getSelected() {
        return this.selected;
    }

    public setSelected(value: boolean) {
        this.selected = value;
    }

    public getFullImageLink() {
        return this.fullImageLink;
    }

    public getMiniImageLink() {
        return this.miniImageLink;
    }
}