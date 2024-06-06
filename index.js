require('https').globalAgent.options.rejectUnauthorized = false;

const express = require('express'); // import liabrary
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js');
require('./models/User');
require('./models/Survey');
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
app.use(bodyParser.json());
app.use(
   cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
   })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// app.get('/', (req, res) => {
//    res.send('Hello World!');
// });
if (process.eventNames.NODE_ENV === 'prouction') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const PORT = process.env.PORT || 5000; 

app.listen(PORT); 

