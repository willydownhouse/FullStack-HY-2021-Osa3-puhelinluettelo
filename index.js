require('dotenv').config();
const express = require('express');
const PhoneNumbers = require('./models/phoneNumbers');

const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.static('build'));
app.use(express.json());

morgan.token('body', req => JSON.stringify(req.body));

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms - :res[content-length] :body - :req[content-length]'
  )
);

app.use(cors());

//ROUTES

//GET
app.get('/api/persons', async (req, res, next) => {
  try {
    const data = await PhoneNumbers.find();

    if (!data) {
      return res.status(404).json({
        status: 'fail',
        message: 'Couldnt find any phonenumbers',
      });
    }

    res.status(200).json({
      status: 'success',
      docs: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
});

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const data = await PhoneNumbers.findById(req.params.id);

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
  } catch (err) {
    next(err);
  }
});

app.get('/info', async (req, res, next) => {
  try {
    const data = await PhoneNumbers.find();

    res
      .status(200)
      .send(
        `Phonebook has info for ${
          data.length
        } people.  ${new Date().toUTCString()}`
      );
  } catch (err) {
    next(err);
  }
});

//PUT
app.put(`/api/persons/:id`, async (req, res, next) => {
  try {
    const data = await PhoneNumbers.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    if (!data) {
      return res.status(404).json({
        status: 'fail',
        message: 'No item with that ID',
      });
    }

    const { name, number } = req.body;

    const newItem = { ...data, name, number };

    res.status(200).json({
      status: 'success',
      data: newItem._doc,
    });
  } catch (err) {
    next(err);
  }
});

//POST
app.post('/api/persons', async (req, res, next) => {
  try {
    const newItem = await PhoneNumbers.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newItem,
    });
  } catch (err) {
    next(err);
  }
});

//DELETE
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const data = await PhoneNumbers.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: 'fail',
        message: 'No item with that ID',
      });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

//ERROR HANDLER

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: 'malformatted ID',
    });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
  next(err);
};

app.use(errorHandler);

//SERVER
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
