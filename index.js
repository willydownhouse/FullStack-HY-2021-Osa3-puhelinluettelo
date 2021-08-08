const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(express.static('build'));

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);

app.use(cors());

let phoneBook = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
];

//ROUTES

//GET
app.get('/api/persons', (req, res) => {
  res.status(200).json({
    status: 'success',
    docs: phoneBook.length,
    data: phoneBook,
  });
});

app.get('/api/persons/:id', (req, res) => {
  const data = phoneBook.find(item => item.id === +req.params.id);

  if (!data) {
    return res.status(404).json({
      status: 'fail',
      message: 'No item with that ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data,
  });
});

app.get('/info', (req, res) => {
  res
    .status(200)
    .send(
      `Phonebook has info for ${
        phoneBook.length
      } people.  ${new Date().toUTCString()}`
    );
});

//PUT
app.put(`/api/persons/:id`, (req, res) => {
  const data = phoneBook.find(item => item.id === +req.params.id);

  if (!data) {
    return res.status(404).json({
      status: 'fail',
      message: 'No item with that ID',
    });
  }

  const { name, number } = req.body;

  const newItem = { ...data, name, number };

  phoneBook = phoneBook
    .filter(item => item.id !== +req.params.id)
    .concat(newItem);

  res.status(200).json({
    status: 'success',
    data: newItem,
  });
});

//POST
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      status: 'fail',
      message: 'Document needs to have name and number.',
    });
  }

  const newItem = {
    id: Math.floor(Math.random() * 100000),
    name,
    number,
  };

  if (phoneBook.map(item => item.name).includes(newItem.name)) {
    return res.status(400).json({
      status: 'fail',
      message: 'That name already exists',
    });
  }

  phoneBook = phoneBook.concat(newItem);

  res.status(201).json({
    status: 'success',
    data: newItem,
  });
});

//DELETE
app.delete('/api/persons/:id', (req, res) => {
  const data = phoneBook.find(item => item.id === +req.params.id);

  if (!data) {
    return res.status(404).json({
      status: 'fail',
      message: 'No item with that ID',
    });
  }
  phoneBook = phoneBook.filter(item => item.id !== +req.params.id);

  res.status(204).end();
});

//SERVER
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
