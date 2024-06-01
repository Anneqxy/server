if (process.env.NODE_ENV === 'production') {
    //we are in production -- return the prod set of keys
    module.exports = require('./prod');
} else {
    module.exports = {
        googleClientID: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        mongoURI: process.env.MONGO_URI,
        cookieKey: process.env.COOKIE_KEY
    };
}

 