require('dotenv').config()
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const UsersListDb = mongoose.createConnection(process.env.USERLIST_MONGO_URL, options);
UsersListDb.on('error', console.error.bind(console, 'UsersList database connection error:'));
UsersListDb.once('open', () => {
  console.log('Connected to UsersList database!');
});


const UserSchema = ({
    username:{
        type : String,
        required : true
    }
})


const UsersListModel = UsersListDb.model('UserDetails', UserSchema);


module.exports = {
    UsersListModel
}