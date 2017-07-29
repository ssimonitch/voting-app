const db = require('../db'); // eslint-disable-line no-unused-vars
const Option = require('../db/models/options');

const router = require('express').Router();

router.get('/', function(req, res) {
  Option.findAll().then(result => {
    res.status(200).send(result);
  });
});

router.get('/:id', function(req, res) {
  Option.findOne().then(result => {
    res.status(200).send(result);
  });
});

router.post('/', (req, res) => {
  Option.create({
    poll_id: req.body.poll_id,
    content: req.body.content
  }).then(() => {
    res.status(200).send('Option created successfully!');
  });
});

router.put('/:id', (req, res) => {
  const updates = req.body.updates;

  Option.findOne({
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
  Option.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.status(200).send('Option removed successfully!');
  });
});

module.exports = router;
