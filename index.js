const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

// const db = require('./server/database/db.js')
const movieRoutes = require('./server/routes.js')
const app = express()

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/client/dist'));
app.use(session({
  secret: "guillermo"
}))

app.use('/flixmix', movieRoutes)


app.get('/session', (req, res) => {
  console.log("Getting session")
  if (req.session.userData) {
    res.send(req.session.userData)
  }
})

app.post('/session', (req, res) => {
  var sess = {
    user_id: req.body.user_id,
    username: req.body.username,
    isLoggedIn: true
  }
  req.session.userData = sess
  res.send();
})

app.get('/logout', (req, res) => {
  delete req.session.userData;
  res.send();
})


//excuse me
app.listen(process.env.PORT || 3000, () => {console.log('Listening to port 3000')})