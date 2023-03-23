const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const url = 'mongodb://mongodb-container:27017/formulaire-db';
const dbName = 'mydb';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB server:', err);
    process.exit(1);
  }

  console.log('Connected successfully to MongoDB server');
  const db = client.db(dbName);

  app.locals.db = db; // make the database instance available to the app
  app.listen(port, () => {
    console.log(`Form server listening at http://localhost:${port}`);
  });
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/submit">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  const { db } = req.app.locals;
  const collection = db.collection('submissions');
  collection.insertOne({ name, email }, (err) => {
    if (err) {
      console.error('Failed to insert submission:', err);
      res.status(500).send('Failed to submit form');
    } else {
      console.log('Form submitted:', { name, email });
      res.send('Form submitted!');
    }
  });
});

