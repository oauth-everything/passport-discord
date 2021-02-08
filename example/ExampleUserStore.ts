import { Profile } from "../dist";

export interface User extends Express.User {
    id: string;
    username: string;
}

export class ExampleUserStore {
    static getUserById(id: string): User {
        return { id, username: `user-$id` };
    }
    static getOrCreateUserFromProfile(_: string, __: string, profile: Profile): User {
        return { id: profile.id, username: profile.username ?? "unknown" };
    }
}
