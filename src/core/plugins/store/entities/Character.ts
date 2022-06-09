export default class Character {
    private id: number;
    private name: string;
    private color: string;
    private fullImageLink: string;
    private miniImageLink: string;

    constructor(id: number, name: string, color: string, fullImageLink: string, miniImageLink: string) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.fullImageLink = fullImageLink;
        this.miniImageLink = miniImageLink;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
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