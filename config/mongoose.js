// // require the library
// const mongoose = require('mongoose');

// // connect to the database
// mongoose.connect('mongodb://127.0.0.1/MyTodoList');

// // aquire the connection (to check if it is successful)
// const db = mongoose.connection;

// // error
// db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

// // up and running then print the message
// db.once('open', function(){
//     console.log('Connected to Database');
// });

// // exporting the database
// module.exports = db;

const mongoose = require('mongoose');
// mongoose.connect('mongodb://0.0.0.0:27017/placement');
const DB = 'mongodb+srv://subhabiswal100:QAMqOf8ja2GW9oBL@cluster0.piyhowh.mongodb.net/MyTodoList';

mongoose.connect(DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
// error
db.on('error',console.error.bind(console,'erroe connecting to db'));
// up and running then message
db.once('open',function(){
    console.log('Success fully connected to the database')
})