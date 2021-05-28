const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const controller = require('./controller');

const app = express();
const port = process.env.PORT || 4200;

// Cross Origin Resource Sharing
app.use(cors());

// configure body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('/', controller.read);

app.get('/:id', controller.readById);

app.post('/', controller.create);

app.put('/:id', controller.update);

app.delete('/:id', controller.deleteById);

// eslint-disable-next-line no-console
if (require.main === module) {
  app.listen(port, () => console.log(`Express Server started on port ${port}`));
} else {
  module.exports = app;
}
