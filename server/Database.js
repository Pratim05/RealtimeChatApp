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

  const MessageDb = mongoose.createConnection(process.env.MESSAGE_MONGO_URL, options);
MessageDb.on('error', console.error.bind(console, 'Message database connection error:'));
MessageDb.once('open', () => {
  console.log('Connected to Message database!');
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


const messageSchema = new mongoose.Schema({
  message:{
    text:{
      type:String, required:true
    },
  },
  users :Array,
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref :"User",
    required :true
  },
},
  {
    timestamps:true
  }
)


const UsersListModel = UsersListDb.model('UserDetails', UserSchema);

const MessageModel = MessageDb.model('messages', messageSchema);


module.exports = {
    UsersListModel,
    MessageModel
}