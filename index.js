const express = require('express'); // import liabrary
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
   cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
   })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);



// app.get('/', (req, res) => {
//     res.send({ bye: 'buddy' });
// });

// /* get -> function; 
//    '/' -> trying to access '/', can be changed to '/grading';
//    (req, res) -> request and outgoing response;
//    res.send() -> immediately send some JSON to made their request
// */


// 



const PORT = process.env.PORT || 5000; 
/* for heroku to decide which prot used in last minute
   if run default, go 5000
*/
app.listen(PORT); // listen to which port