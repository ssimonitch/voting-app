const db = require('../../db'); // eslint-disable-line no-unused-vars

const User = require('../../db/models/users');
const Option = require('../../db/models/options');
const Poll = require('../../db/models/polls');
const Vote = require('../../db/models/votes');

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

// increment/decrement tally
router.patch('/:id', (req, res) => {
  Option.findOne({
    where: { id: req.params.id }
  })
    .then(option => {
      const user_id = req.body.user_id;
      const poll_id = option.poll_id;

      // find or create vote record
      Vote.findOrCreate({
        where: { user_id, poll_id },
        defaults: { option_id: option.id }
      })
        // Promise.spread divides returned array into 2 parts
        // and passes them as arguments to the callback function
        .spread((vote, newRecord) => {
          // case: new record, new option
          if (newRecord) {
            // increase tally and poll/user records
            option.increment('tally');
            User.findById(user_id).then(user => user.increment('vote_count'));
            Poll.findById(poll_id).then(poll => poll.increment('vote_count'));
            return res.status(200).send(`Voted for option "${option.content}" on poll ${option.poll_id}`);
          }

          // case: old record, new option
          if (!newRecord && vote.option_id !== option.id) {
            // decrement old option
            Option.findById(vote.option_id).then(oldOption => {
              oldOption.decrement('tally');
            });

            // increment new option
            option.increment('tally');

            // update record
            vote.update({ option_id: option.id });
            return res.status(200).send(`Changed vote to option "${option.content}" on poll ${option.poll_id}`);
          }

          // case: old record, old option
          if (!newRecord && vote.option_id === option.id) {
            return res.status(200).send('You have already voted for that option.');
          }
        })
        .catch(err => console.log(`Error processing vote: ${err}`));
    })
    .catch(err => {
      console.log(`Invalid option number. ${err}`);
      return res.status(404).send('Could not process vote');
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
