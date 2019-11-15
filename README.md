@oauth-everything/passport-discord
==================================

[![Version][version-badge]][version-link]
[![Dependencies][dependencies-badge]][dependencies-link]
[![Dev Dependencies][dev-dependencies-badge]][dev-dependencies-link]
[![Vulnerabilities][vulnerabilities-badge]][vulnerabilities-link]
[![License][license-badge]][license-link]
[![Types][types-badge]][types-link]

*A fully typed [Passport][passport-link] strategy for authenticating users with [Discord][discord-link] using OAuth 2.0 and the Discord API.*

[Passport][passport-link] is authentication middleware for Node.js. It allows you to easily add user authentication to your application. It supports any application using [Connect][connect-link]-style middleware, including [Express][express-link].

`@oauth-everything/passport-discord` is an authentication Strategy for [Passport][passport-link] that allows users to authenticate using their [Discord][discord-link] account.

## Installation

```bash
$ npm install @oauth-everything/passport-discord
```

## Setup/Configuration

<details>
<summary>Typescript Example</summary>

```ts
import express from 'express';
import passport from 'passport';

// Import the strategy and types from @oauth-everything/passport-discord
import { Strategy, Profile, VerifyCallback /*, Scope*/ } from '@oauth-everything/passport-discord';

// Set up express/connect/etc
const app = express();
app.use(...);
...
...

// Set up passport
passport.serializeUser((user: User, done) => {
    done(null, /* user.id */);
})
passport.deserializeUser((id: string, done) => {
    done(null, /* database.getUserById(id) */);
});
...
...

// Set up the Discord Strategy
passport.use(new Strategy(
    {
        // The Client Id for your discord application (See "Discord Application Setup")
        clientID: "wumpus",

        // The Client Secret for your discord application (See "Discord Application Setup")
        clientSecret: "supmuw",

        // The callback URL - Your app should be accessible on this domain. You can use
        // localhost for testing, just makes sure it's set as a Redirect URL (See "Discord Application Setup")
        callbackURL: "https://myapp.com/auth/discord/callback",

        /* Optional items: */

        // The scope for your OAuth request - You can use strings or Scope values
        // The default scope is Scope.IDENTIFY which gives basic profile information
        scope: [Scope.EMAIL, Scope.GUILDS_JOIN, "webhook.incoming", ...]

    },
    (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback<User>) => {

        // `profile` will be the user's Discord profile
        console.log(profile);

        // You should use that to create or update their info in your database/etc and then return the user using `cb`
        cb(null, /* database.createOrUpdateDiscordUser(profile) */)

    }
));

// Connect passport to express/connect/etc
app.get("/auth/discord", passport.authenticate("discord"));
app.get("/auth/discord/callback", passport.authenticate("discord", {
    failureRedirect: "/login",
    successRedirect: "/"
}));

// Start the app
app.listen(80);
```

</details>

<br>

<details>
<summary>Javascript Example</summary>

```js
const express = require('express');
const passport = require('passport');

// Import the strategy from @oauth-everything/passport-discord
const { Strategy /*, Scope*/ } = require('@oauth-everything/passport-discord');

// Set up express/connect/etc
const app = express();
app.use(...);
...
...

// Set up passport
passport.serializeUser((user, done) => {
    done(null, /* user.id */);
})
passport.deserializeUser((id, done) => {
    done(null, /* database.getUserById(id) */);
});
...
...

// Set up the Discord Strategy
passport.use(new Strategy(
    {
        // The Client Id for your discord application (See "Discord Application Setup")
        clientID: "wumpus",

        // The Client Secret for your discord application (See "Discord Application Setup")
        clientSecret: "supmuw",

        // The callback URL - Your app should be accessible on this domain. You can use
        // localhost for testing, just makes sure it's set as a Redirect URL (See "Discord Application Setup")
        callbackURL: "https://myapp.com/auth/discord/callback",

        /* Optional items: */

        // The scope for your OAuth request - You can use strings or Scope values
        // The default scope is Scope.IDENTIFY which gives basic profile information
        scope: [Scope.EMAIL, Scope.GUILDS_JOIN, "webhook.incoming", ...]

    },
    (accessToken, refreshToken, profile, cb) => {

        // `profile` will be the user's Discord profile
        console.log(profile);

        // You should use that to create or update their info in your database/etc and then return the user using `cb`
        cb(null, /* database.createOrUpdateDiscordUser(profile) */)

    }
));

// Connect passport to express/connect/etc
app.get("/auth/discord", passport.authenticate("discord"));
app.get("/auth/discord/callback", passport.authenticate("discord", {
    failureRedirect: "/login",
    successRedirect: "/"
}));

// Start the app
app.listen(80);
```

</details>


## Discord Application Setup

<details>
<summary>Click to expand</summary>

1. Go to https://discordapp.com/developers/applications and create a New Application

   ![asdf](https://p.cp3.es/discord-oauth-1.png)
   ![asdf](https://p.cp3.es/discord-oauth-2.png)

2. Copy the Client ID and Client Secret and save them somewhere safe

   ![asdf](https://p.cp3.es/discord-oauth-3.png)

3. Go to the OAuth tab and add a redirect URL - this will be the URL on your website where Passport is set up

   ![asdf](https://p.cp3.es/discord-oauth-4.png)
   ![asdf](https://p.cp3.es/discord-oauth-6.png)

</details>


## License

[The MPL v2 License](https://opensource.org/licenses/MPL-2.0)


<!-- Link References -->

[passport-link]: http://passportjs.org/
[connect-link]: https://www.senchalabs.org/connect/
[express-link]: https://expressjs.com/
[discord-link]: https://www.discord.com/

[version-badge]: https://img.shields.io/npm/v/@oauth-everything/passport-discord
[version-link]: https://github.com/oauth-everything/passport-discord

[types-badge]: https://img.shields.io/npm/types/@oauth-everything/passport-discord
[types-link]: https://github.com/oauth-everything/passport-discord

[license-badge]: https://img.shields.io/npm/l/@oauth-everything/passport-discord
[license-link]: https://github.com/oauth-everything/passport-discord/blob/master/LICENSE.md

[dependencies-badge]: https://david-dm.org/oauth-everything/passport-discord/status.svg
[dependencies-link]: https://david-dm.org/oauth-everything/passport-discord

[dev-dependencies-badge]: https://david-dm.org/oauth-everything/passport-discord/dev-status.svg
[dev-dependencies-link]: https://david-dm.org/oauth-everything/passport-discord?type=dev

[vulnerabilities-badge]: https://snyk.io/test/npm/@oauth-everything/passport-discord/badge.svg
[vulnerabilities-link]: https://snyk.io/test/npm/@oauth-everything/passport-discord
