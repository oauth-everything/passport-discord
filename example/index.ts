// Imports
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Profile, Scope, Strategy, VerifyCallback } from '@oauth-everything/passport-discord';

import { ExampleUserStore, User } from './ExampleUserStore';

// Set up passport

// The `serializeUser` function is used by passport to serialize the current
// `request.user` into the persistant session data. The function is given the
// currently logged in user. The returned value is saved in the session so the
// user can be looked up again in future requests.
passport.serializeUser((user, done) => {
    done(null, (user as User).id);
});

// The `deserializeUser` function is used by passport to deserialize the
// current user from the session. The function is given the value that was
// saved into the session. You should use this value to look up the user
// and return the full user data. The returned value will be saved on the
// request as 'request.user` for other middleware to use.
passport.deserializeUser((id: string, done) => {
    done(null, ExampleUserStore.getUserById(id));
});

// Set up the Discord Strategy
passport.use(new Strategy(
    {
        // The Client Id for your discord application (See "Discord Application Setup")
        clientID: "wumpus",

        // The Client Secret for your discord application (See "Discord Application Setup")
        clientSecret: "supmuw",

        // The callback URL - Your app should be accessible on this domain. You can use
        // localhost for testing, just makes sure it's set as a Redirect URL (See "Discord Application Setup")
        callbackURL: "http://localhost:8080/auth/discord/callback",

        /* Optional items: */

        // The scope for your OAuth request - You can use strings or Scope values
        // The default scope is Scope.IDENTIFY which gives basic profile information
        scope: [Scope.EMAIL]

    },
    (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback<User>) => {

        // `accessToken` is the discord API access token for this user
        // `refreshToken` is the discord API refresh token for this user

        // If you want to pull more information about the user, use the access token to pull it from the Discord API
        // IMPORTANT: `discord-passport` is NOT an API library - it's an Oauth Strategy. If you want to interact with the
        // Discord API to get Guilds, etc, you will need to use the `accessToken` and make the requests yourself.

        // `profile` will be the user's standardized oauth profile
        console.log(profile);

        // `profile.discord` will be the user's unmodified Discord profile as returned by the Discord API.

        // You should use this data to create or update the user's information in your database, and then return
        // the user using `done`.
        done(null, ExampleUserStore.getOrCreateUserFromProfile(accessToken, refreshToken, profile));

    }
));

// Create a new express app
const app = express();

// Add session support so we can save the user between requests
// IMPORTANT: This is just a test session setup. It is not suitable for production use.
app.use(session({ secret: "asdfg" }));

// Initialize passport and attatch it to the express app
app.use(passport.initialize());

// Add the strategy middleware to allow the user to persist across requests using the session
app.use(passport.session());

// Create an express route to start the Oauth request
app.get("/auth/discord", passport.authenticate("discord"));

// Create an express route to handle the response to the Oauth request
app.get("/auth/discord/callback", passport.authenticate("discord", {
    failureRedirect: "/login",
    successRedirect: "/"
}));

app.get("/", (req, res) => {
    console.log("req.user:");
    console.log(req.user);
    res.status(200).json(req.user);
})

// Start the app
app.listen(8080);
