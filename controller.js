// use with mysql npm package
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

const read = (req, res) => {
  connect.query('Select * from simpsons ', (err, results, fields) => {
    if (err) throw new Error(err.message);
    res.json(results);
  });
};

const readById = (req, res) => {
  const { id } = req.params;
  connect.query('Select * from simpsons where id = ? ', [id], (err, results, fields) => {
    if (err) throw new Error(err.message);
    res.json(results);
  });
};

const create = (req, res) => {
  const { name } = req.body;
  connect.query('INSERT INTO simpsons SET name = ? ', [name], (err, results, fields) => {
    if (err) throw new Error(err.message);
    const { insertId } = results;
    res.json({ response: `Object created with an ID of ${insertId}` });
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  connect.query('update simpsons set name = ? where id = ? ', [name, id], (err, results, fields) => {
    if (err) throw new Error(err.message);
    res.json({ response: 'Object successfully updated.' });
  });
};

const deleteById = (req, res) => {
  const { id } = req.params;
  connect.query('delete from simpsons where id = ? ', [id], (err, results, fields) => {
    if (err) throw new Error(err.message);
    res.json({ response: `deleted object with an id of ${id}` });
  });
};

module.exports = {
  read, readById, create, update, deleteById,
};
