/* eslint-disable no-console */
/**
 * Database initialization script. Run `node ./initDB.js`. Does not delete
 * existing data.
 */

const mongoose = require('mongoose');
require('dotenv').config();

const mockPosts = require('./mockPosts');
const mockEvents = require('./mockEvents');
const mockUsers = require('./mockUsers');

const Post = require('../models/Post');
const Event = require('../models/Event');
const User = require('../models/User');

mockPosts.posts.forEach((post) => {
  Post.create(post).catch((err) => console.log(err));
});

mockEvents.upcomingEvents.forEach((event) => {
  Event.create(event).catch((err) => console.log(err));
});

mockUsers.users.forEach((user) => {
  User.create(user).catch((err) => console.log(err));
});

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const mongoDB = `mongodb+srv://${user}:${password}@cluster0.49ssl.mongodb.net/emerald?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => { console.log('Connected successfully'); },
    (err) => { console.log(`Connection failed with ${err}`); },
  );

setTimeout(() => mongoose.connection.close(), 2000);
