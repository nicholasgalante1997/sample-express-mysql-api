const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sample_express',
});

connect.connect((err) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err);
});

const app = express();
const port = process.env.PORT || 4200;

// Cross Origin Resource Sharing
app.use(cors());

// configure body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('/', (req, res) => {
  connect.query('Select * from simpsons ', (err, results, fields) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      res.json(results);
    }
  });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Express Server started on port ${port}`));
