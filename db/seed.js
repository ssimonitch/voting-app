const db = require('../db');

const seedUsers = () =>
  db.Promise.map(
    [
      {
        email: 'bob@test.com',
        username: 'iambob',
        password: 'abc123',
        vote_count: 0
      },
      {
        email: 'john@test.com',
        username: 'iamjohn',
        password: '123abc',
        vote_count: 0
      }
    ],
    user => db.model('users').create(user)
  );

const seedPolls = () =>
  db.Promise.map(
    [
      {
        user_id: 1,
        title: 'What color do you like?',
        vote_count: 0
      },
      {
        user_id: 2,
        title: 'Are you thirsty?',
        vote_count: 0
      },
      {
        user_id: 2,
        title: 'Does this dress make me look fat?',
        vote_count: 0
      }
    ],
    poll => db.model('polls').create(poll)
  );

const seedOptions = () =>
  db.Promise.map(
    [
      {
        poll_id: 1,
        content: 'Red',
        tally: 0
      },
      {
        poll_id: 1,
        content: 'Green',
        tally: 0
      },
      {
        poll_id: 1,
        content: 'Blue',
        tally: 0
      },
      {
        poll_id: 2,
        content: 'You bet',
        tally: 0
      },
      {
        poll_id: 2,
        content: 'I\'m parched',
        tally: 0
      },
      {
        poll_id: 2,
        content: 'Not really',
        tally: 0
      },
      {
        poll_id: 3,
        content: 'Yes',
        tally: 0
      },
      {
        poll_id: 3,
        content: 'No',
        tally: 0
      }
    ],
    option => db.model('options').create(option)
  );

db.didSync
  .then(() => db.sync({ force: true }))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedPolls)
  .then(polls => console.log(`Seeded ${polls.length} polls OK`))
  .then(seedOptions)
  .then(options => console.log(`Seeded ${options.length} options OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
