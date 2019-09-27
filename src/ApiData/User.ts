
export interface User {

    /**
     * The user's id
     *
     * Needed scope: `identify`
     */
    id: string;

    /**
     * The user's username, not unique across the platform
     *
     * Needed scope: `identify`
     */
    username: string;

    /**
     * The user's 4-digit discord-tag
     *
     * Needed scope: `identify`
     */
    discriminator: string;

    /**
     * The user's avatar hash
     *
     * Needed scope: `identify`
     */
    avatar?: string;

    /**
     * Whether the user belongs to an OAuth2 application
     *
     * Needed scope: `identify`
     */
    bot?: boolean;

    /**
     * Whether the user has two factor enabled on their account
     *
     * Needed scope: `identify`
     */
    mfa_enabled?: boolean;

    /**
     * The user's chosen language option
     *
     * Needed scope: `identify`
     */
    locale?: string;

    /**
     * Whether the email on this account has been verified
     *
     * Needed scope: `email`
     */
    verified?: boolean;

    /**
     * The user's email
     *
     * Needed scope: `email`
     */
    email?: string;

    /**
     * The flags on a user's account
     *
     * Needed scope: `identify`
     */
    flags?: number;

    /**
     * The type of Nitro subscription on a user's account
     *
     * Needed scope: `identify`
     */
    premium_type?: number;
}
