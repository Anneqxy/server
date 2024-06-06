// const passport = require('passport');

// module.exports = app => {
//     app.get(
//         '/auth/google', 
//         passport.authenticate('google', {
//             scope: ['profile', 'email']
//         })
//     ); 
 
//     app.get(
//         '/auth/google/callback',
//         passport.authenticate('google'),
//         (req, res) => {
//             res.redirect('/surveys');
//         }
//     );


//     app.get('/api/logout', (req, res) => {
//         req.logout();
//         res.redirect('/');
//     });

//     app.get('/api/current_user', (req, res) => {
//         res.send(req.user);
//     });
// };

const passport = require('passport');

module.exports = app => {
    // Route to start OAuth flow
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    ); 

    // OAuth callback route
    app.get(
        '/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }), // Handle failures
        (req, res) => {
            res.redirect('/surveys'); // Redirect after successful login
        }
    );

    // Logout route
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // Route to get current user info
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
