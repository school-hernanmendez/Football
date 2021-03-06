const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const User = require('./mongoose.js')
const workouts = require('./workouts.js')
const compression = require('compression');

const port = process.env.PORT || 8080;

const forceSsl = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && port !== 8080) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

app.use(forceSsl);
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('build'));
app.use(cors());

app.use((req, res, next) => {
  res.error = (errMessage, status = 500) => res.status(status).send(errMessage)
  
  res.catchError = (errMessage, status = 500) => {
    return err => {
    console.error(err.message)
    res.status(status).send(errMessage)
    }
  }
  next()
})

function getDay() {
  const day = (new Date()).getDay();
  switch (day) {
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
    case 0:
      return 'Sunday'
    default:
      break
  }
}

app.get('*', (req, res, next) => {
  if(/\/(api|logo)/.test(req.url)) {
    next();
  } else if(req.url === '/') {
    res.sendFile(`${__dirname}/build/index.html`);
  } else if(req.url === '/roster') {
    res.sendFile(`${__dirname}/build/index.html`);
  } else {
    res.redirect('/')
  }
})

app.get('/api/login/:username', (req, res) => {
  User.findOne({ username: req.params.username }).lean().exec()
  .then(user => {
    if(user) {
      user.day = getDay()
      res.status(200).json(user)
    } else {
      res.status(400).send('no user')
    }
  }).catch(res.catchError('mongo error'))
});

app.get('/api/signup/:username/:firstname/:lastname', (req, res) => {
  const { username, firstname, lastname } = req.params;
  if(!username) res.status(422).send('Username required') 
  if(!firstname) res.status(422).send('Firstname required') 
  if(!lastname) res.status(422).send('Lastname required') 
  User.findOne({ username: req.params.username }).lean().exec()
    .then(user => {
    if(user) {
      res.status(409).send('User already exists')
    } else {
      const newUser = User({ username, firstname, lastname, workouts, weight: 0, height:{ feet: 0, inches: 0 }});
      newUser.save()
      .then(doc => {
        doc.day = getDay()
        res.json(doc)
      })
      .catch(res.catchError('mongo error'))
    }
    }).catch(res.catchError('mongo error'))
  });

app.get('/api/all', (req, res) => {
  User.find({}).lean()
    .then(arr => res.json(arr))
    .catch(res.catchError('mongo error'))
});

app.get('/logo.svg', (req, res) => {
  res.sendFile(`${__dirname}/build/logo.svg`);
});

app.get('/api/delete/:id', (req,res) => {
  User.findByIdAndDelete(req.params.id).exec()
    .then(() => {
      User.find({}).lean()
      .then(arr => res.json(arr))
      .catch(res.catchError('mongo error'))
    }).catch(res.catchError('mongo error'))
});

app.post('/api/change/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec()
  .then(doc => {
    doc.day = getDay()
    res.json(doc)
  })
  .catch(res.catchError('mongo error'))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});