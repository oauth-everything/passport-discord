export enum Scope {

    /** For oauth2 bots, this puts the bot in the user's selected guild by default */
    BOT = "bot",

    /** Allows /users/@me/connections to return linked third-party accounts */
    CONNECTIONS = "connections",

    /** Enables /users/@me to return an email */
    EMAIL = "email",

    /** Allows /users/@me without email */
    IDENTIFY = "identify",

    /** Allows /users/@me/guilds to return basic information about all of a user's guilds */
    GUILDS = "guilds",

    /** Allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild */
    GUILDS_JOIN = "guilds.join",

    /** Allows your app to join users to a group dm */
    GDM_JOIN = "gdm.join",

    /** For local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) */
    MESSAGES_READ = "messages.read",

    /** For local rpc server access, this allows you to control a user's local Discord client */
    RPC = "rpc",

    /** For local rpc server api access, this allows you to access the API as the local user */
    RPC_API = "rpc.api",

    /** For local rpc server api access, this allows you to receive notifications pushed out to the user */
    RPC_NOTIFICATIONS_READ = "rpc.notifications.read",

    /** This generates a webhook that is returned in the oauth token response for authorization code grants */
    WEBHOOK_INCOMING = "webhook.incoming"

}
