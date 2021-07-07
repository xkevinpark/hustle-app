// require express router here
const router = require('express').Router();
// require mongoose User model
let User = require('../models/userModel');

// Make a GET request for all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Make a POST request for new users
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!')) // respond with 'User added!'
    .catch(err => res.status(400).json('Error: ' + err)); // or respond with error message
});

module.exports = router;
