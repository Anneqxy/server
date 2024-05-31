const express = require('express'); // import liabrary
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
require('./models/User');
require('./services/passport');
const keyName = process.env.KEY_NAME;


// mongoose.connect(keys.mongoURI);
mongoose.connect(keys.mongoURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
 }).then(() => {
   console.log('Connected to MongoDB');
 }).catch(err => {
   console.error('MongoDB connection error:', err);
 });
 

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
//    res.send('Hello World!');
// });


const PORT = process.env.PORT || 5000; 

app.listen(PORT); 

