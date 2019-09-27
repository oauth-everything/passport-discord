import { ProfileItem } from "@oauth-everything/profile";

import { User } from "./ApiData/User";

// Discord epoch (2015-01-01T00:00:00.000Z)
const EPOCH = 1420070400000;

// Date is bits 22-63
const SHIFT = 1 << 22;

export function snowflakeToDate(snowflake: string): Date {
    return new Date((+snowflake / SHIFT) + EPOCH);
}

export function buildPhotos(json: User): ProfileItem[] {

    const photos: ProfileItem[] = [];

    if (json.avatar) {
        photos.push({
            value: `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.png`,
            primary: true,
            type: "avatar"
        });
    }

    return photos;

}
