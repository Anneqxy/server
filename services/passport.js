// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');
// const keys = require('../config/keys');

// const User = mongoose.model('users');

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id).then(user => {
//         done(null, user);
//     });
// });

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: keys.googleClientID,
//             clientSecret: keys.googleClientScrete,
//             callbackURL: '/auth/google/callback'
//         }, 
//         (accessToken, refreshToken, profile, done) => {
//             User.findOne({googleId: profile.id}).then((existingUser) =>{
//                 if (existingUser) {
//                     //We already have a record with the given profile ID
//                     done(null, existingUser);
//                 } else {
//                     new User({googleId: profile.id})
//                         .save()
//                         .then(user => done(null, user));
//                 }
//             });
//         }
//     )
// );



const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log('Serialize User:', user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        console.log('Deserialize User:', user);
        done(null, user);
    }).catch(err => {
        console.error('Error deserializing user:', err);
        done(err, null);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('Access Token:', accessToken);
            console.log('Profile:', profile);
            try {
                const existingUser = await User.findOne({ googleId: profile.id });
                if (existingUser) {
                    console.log('Existing user:', existingUser);
                    return done(null, existingUser);
                }

                const user = await new User({ googleId: profile.id }).save();
                console.log('New user:', user);
                done(null, user);
            } catch (error) {
                console.error('Error in GoogleStrategy:', error);
                done(error, null);
            }
        }
    )
);
