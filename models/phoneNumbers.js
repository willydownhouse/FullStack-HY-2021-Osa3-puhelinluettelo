const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let DB;

if (process.argv.length === 3) {
  DB = process.argv[2];
} else {
  DB = process.env.DB_CONNECTION;
}

//DATABASE CONNECTION

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch(err => {
    console.log('there was a problem connecting to DataBase');
    console.log(err.message);
  });

const phoneNumberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Document must have a name.'],
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: [true, 'Document must have a number.'],
    minlength: 8,
  },
});

phoneNumberSchema.plugin(uniqueValidator);

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema);
