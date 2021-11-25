const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

//const password = process.argv[2];

// const mongoUrl = `mongodb://willydownhouse:${password}@cluster0-shard-00-00.nqyxw.mongodb.net:27017,cluster0-shard-00-01.nqyxw.mongodb.net:27017,cluster0-shard-00-02.nqyxw.mongodb.net:27017/Full_Stack_puhelinluettelo?ssl=true&replicaSet=atlas-174wqa-shard-0&authSource=admin&retryWrites=true&w=majority`;

const mongoUrl = process.env.DB_CONNECTION;

mongoose
  .connect(mongoUrl, {
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
  name: String,
  number: String,
});

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);

if (process.argv.length === 3) {
  PhoneNumber.find().then(res => {
    console.log('phonebook:');
    res.map(item => {
      console.log(`${item.name} ${item.number}`);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const phoneNumber = new PhoneNumber({
    name: process.argv[3],
    number: process.argv[4],
  });

  phoneNumber.save().then(() => {
    console.log(
      `added ${phoneNumber.name} number ${phoneNumber.number} to phonebook`
    );
    mongoose.connection.close();
  });
}
