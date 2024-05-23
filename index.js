const express = require('express'); // import liabrary
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

/* get -> function; 
   '/' -> trying to access '/', can be changed to '/grading';
   (req, res) -> request and outgoing response;
   res.send() -> immediately send some JSON to made their request
*/

const PORT = process.env.PORT || 5000; 
/* for heroku to decide which prot used in last minute
   if run default, go 5000
*/
app.listen(PORT); // listen to which port