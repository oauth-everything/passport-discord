@oauth-everything/passport-discord
=====================================

A [Passport](http://passportjs.org/) strategy for authenticating with
[Discord](https://www.discord.com/) using OAuth 2.0 and the Discord API.

This module lets you authenticate using Discord in your Node.js applications.
By plugging into Passport, Discord authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](https://www.senchalabs.org/connect/)-style middleware, including
[Express](https://expressjs.com/).

## Install

```bash
$ npm install @oauth-everything/passport-discord
```
#### Configure Strategy

The Discord authentication strategy authenticates users using a Discord
account and OAuth 2.0 tokens.  The app ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Discord profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```ts
passport.use(new Strategy(
    {
        clientID: DISCORD_APP_ID,
        clientSecret: DISCORD_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/discord/callback"
    },
    (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback<User>) => {

        User.findOrCreate({ discordId: profile.id }, (err: Error, user: User) => {
            return cb(err, user);
        });

    }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'discord'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](https://expressjs.com/)
application:

```javascript
app.get('/auth/discord',
  passport.authenticate('discord'));

app.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## License

[The MPL v2 License](https://opensource.org/licenses/MPL-2.0)
