require('dotenv').config()
const mongoose = require('mongoose')

const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  };

  const UsersListDb = mongoose.createConnection(process.env.USERLIST_MONGO_URL, options);
UsersListDb.on('error', console.error.bind(console, 'UsersList database connection error:'));
UsersListDb.once('open', () => {
  console.log('Connected to UsersList database!');
});

  const UserOtpStoreDb = mongoose.createConnection(process.env.OTPSTORE_MONGO_URL, options);
UsersListDb.on('error', console.error.bind(console, ' UserOtpStore database connection error:'));
UsersListDb.once('open', () => {
  console.log('Connected to  UserOtpStore database!');
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
    phoneNumber:{
        type : String,
    },
    about:{
        type : String,
        max:300,
    },
    socialLinks:{
      facebookUrl : String,
      youtubeUrl : String,
      instagramUrl :String
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
      filename: String ,
      contentType:String,
      data: mongoose.Schema.Types.Buffer
    },
    isOnline :{
      type:Boolean,
    }
})


const messageSchema = new mongoose.Schema({
  message:{
    text:{
      type:String,
    },
    file:{
      filename: String ,
      contentType:String,
      data: mongoose.Schema.Types.Buffer
    },
    fileType:{
      type: String,
    }
  },
  users :Array,
  isRead : Boolean,
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

const userOtpVerificationSchema = new mongoose.Schema({
  email:String,
  otp:String,
  createdAt:Date,
  expiresAt:Date,
})

const  chatNotificationSchema = new mongoose.Schema({
  sender:String,
  message:{
    text:{
      type:String, required:true
    },
  },
  reciever : String,
  Isread:Boolean,
  recievedAt: Date,
})


const UsersListModel = UsersListDb.model('UserDetails', UserSchema);

const MessageModel = MessageDb.model('messages', messageSchema);
const notificationModel = MessageDb.model('notifications', chatNotificationSchema);

const userOtpVerification = UserOtpStoreDb.model("userOtpVerification", userOtpVerificationSchema)

module.exports = {
    UsersListModel,
    MessageModel,
    userOtpVerification,
    notificationModel
}