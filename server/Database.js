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
        required : true,
        min :3,
        max:20,
        unique :true
    },
    email:{
        type : String,
        required : true,
        max:50,
        unique :true
    },
    password:{
        type : String,
        required : true,
        min :6,
        unique :true
    },
    isAvatarSet:{
      type:Boolean,
      default: false
    },
    avatarImage :{
      type:String,
      default:""
    },
})


const UsersListModel = UsersListDb.model('UserDetails', UserSchema);


module.exports = {
    UsersListModel
}