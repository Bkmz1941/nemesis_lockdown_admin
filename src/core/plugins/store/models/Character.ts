export default class Character {
    public id!: number;
    public name!: string;
    public systemName!: string;
    public color!: string;
    public fullImageLink!: string;
    public miniImageLink!: string;

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

    public getFullImageLink() {
        return this.fullImageLink;
    }

    public getMiniImageLink() {
        return this.miniImageLink;
    }
}