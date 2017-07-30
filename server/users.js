const db = require('../db'); // eslint-disable-line no-unused-vars
// const sequelize = require('sequelize');

const User = require('../db/models/users');
const Poll = require('../db/models/polls');
const Option = require('../db/models/options');
const Vote = require('../db/models/votes');

const router = require('express').Router();

router.get('/', (req, res) => {
  User.findAll({
    include: [
      {
        model: Poll
      }
    ]
  }).then(result => {
    res.status(200).send(result);
  });
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    include: [{ model: Poll }, { model: Vote }]
  }).then(result => {
    res.status(200).send(result);
  });
});

router.get('/:id/votes', (req, res) => {
  Vote.findAll({
    where: { user_id: req.params.id },
    attributes: [['updated_at', 'date']],
    include: [
      {
        model: Poll,
        attributes: ['title']
      },
      {
        model: Option,
        attributes: ['content']
      }
    ]
  }).then(result => {
    res.status(200).send(result);
  });
});

router.post('/', (req, res) => {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }).then(() => {
    res.status(200).send('User created successfully!');
  });
});

router.put('/:id', (req, res) => {
  const updates = req.body.updates;

  User.findOne({
    where: { id: req.params.id }
  })
    .then(user => {
      return user.updateAttributes(updates);
    })
    .then(result => {
      res.status(200).send(result);
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.status(200).send('User removed successfully!');
  });
});

module.exports = router;
