export class User {
    id: number;
    nickname: string;

    constructor(id: number, nickname: string) {
        this.id = id;
        this.nickname = nickname;
    }

    greeting() {
        return `Hello, ${this.nickname}!`;
    }

    toString() {
        return JSON.stringify({id: this.id, nickname: this.nickname});
    }

    static fromObject(json: any) {
        return new User(json.id, json.nickname)
    }
}
