const db = require('../db'); // eslint-disable-line no-unused-vars
const Poll = require('../db/models/polls');
const Option = require('../db/models/options');

const router = require('express').Router();

router.get('/', function(req, res) {
  Poll.findAll({
    include: [Option]
  }).then(result => {
    res.status(200).send(result);
  });
});

router.get('/:id', function(req, res) {
  Poll.findOne({
    where: { id: req.params.id },
    include: [Option]
  }).then(result => {
    res.status(200).send(result);
  });
});

router.post('/', (req, res) => {
  Poll.create({
    user_id: req.body.user_id,
    title: req.body.title
  }).then(() => {
    res.status(200).send('Poll created successfully!');
  });
});

router.put('/:id', (req, res) => {
  const updates = req.body.updates;

  Poll.findOne({
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
  Poll.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.status(200).send('Poll removed successfully!');
  });
});

module.exports = router;
