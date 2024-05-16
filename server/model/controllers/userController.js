const { UsersListModel, userOtpVerification, AdminsListModel } = require("../../Database");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")
require("dotenv").config()


//Settings for sent mail on User register
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mernwebdevelopment@gmail.com",
    pass: "aopoldzvmjufrgwz",
  },
});

module.exports.register = async (req, res, next) => {
  try {
    const { password,username,email,phoneNumber,about } = req.body;

    // console.log(req.body,req.files)
    const usernameCheck = await UsersListModel.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already exist", status: false });
    }
    const emailCheck = await UsersListModel.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already exist", status: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    let socialLinks = {
      facebookUrl : "",
      youtubeUrl : "",
      InstagramUrl : ""
    };
    let imageData = {
      filename: null,
      contentType: null,
      data: null,
    };
    if(req.files!==null){
         imageData = {
          filename: req.files.avatarImage.name,
          contentType: req.files.avatarImage.mimetype,
          data: req.files.avatarImage.data,
        };
      }

    const user = await UsersListModel.create({
      username,
      email,
      phoneNumber,
      about,
      socialLinks:socialLinks,
      password: hashPassword,
      avatarImage:imageData,
    });

    // Create a user object without the password field
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber,
      about,
      socialLinks,
      avatarImage:user.avatarImage,
    };

    //Sending an email
    var mailOptions = {
      from: "SWIFT TALK <mernwebdevelopment@gmail.com>",
      to: user.email,
      subject: "Thanks for Registering with Swift Talk",
      html: `
          <h3> Welcome ${user.username},</h3>
          <p>We wanted to express our sincere gratitude for choosing Swift Talk and completing the registration process.</p>
          <p>Welcome to our community! As a registered member, you now have access to a range of features and functionalities that will enhance your overall experience on Swift Talk.</p>
          <p>Feel free to explore the various feature and connect with friends or colleagues, and discover the full potential of Swift Talk.</p>
          <p>If you ever have any questions or need assistance, please don't hesitate to reach out to our support team at <a href = "mailto:mernwebdevelopment@gmail.com">mernwebdevelopment@gmail.com</a>.</p>
          <p>Thank you once again for choosing Swift Talk. We look forward to providing you with an excellent chat experience!</p>
          <p>Best regards,<br>
          <b>The Swift Talk Team</b></p>
        `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent : " + info.response);
      }
    });

    return res.json({
      msg: "Account Created Succesfully",
      status: true,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UsersListModel.findOne({ username });
    if (!user) {
      return res.json({ msg: "Wrong Username", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Password", status: false });
    }
    // Create a user object without the password field
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber:user.phoneNumber,
      about:user.about,
      socialLinks:user.socialLinks,
      avatarImage:user.avatarImage
    };

    return res.json({
      msg: "Login Successfully",
      status: true,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// for Admin
module.exports.adminlogin = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    console.log(password, email)
    const user = await AdminsListModel.findOne({ email });
    console.log(user)
    if (!user) {
      return res.json({ msg: "Wrong Email", status: false });
    }
    const isPasswordValid = (password === user.password)
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Password", status: false });
    }
    // Create a user object without the password field
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber:user.phoneNumber,
      organizationName : user.organizationName
    };

    return res.json({
      msg: "Login Successfully",
      status: true,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports.forgetpass = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UsersListModel.findOne({ email });
    if (!user) {
      return res.json({ msg: "No Registered Account found", status: false });
    }
    const secret = process.env.JWT_SECRET_KEY + user.password
    const token = jwt.sign({email:user.email , id : user._id}, secret , {expiresIn :"10m"})
    
    const resetLink = `http://localhost:3000/resetpass/${user._id}/${token}`
   // console.log(resetLink)
    //Sending an email
    var mailOptions = {
      from: "SWIFT TALK <mernwebdevelopment@gmail.com>",
      to: user.email,
      subject: "Forget Password",
      html: `
          <h3> Welcome ${user.username},</h3>
          <p>We wanted to express our sincere gratitude for choosing Swift Talk.</p>
          <h4>Click the Button to Reset Password , Link will Expires in 6 minutes</h4>
          <button><a href =${resetLink}>Reset Password</a></button>

          <p>If you not made this request , Please Ignore<p/
         
          <p>Best regards,<br>
          <b>The Swift Talk Team</b></p>
        `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        //console.log("Email sent : " + info.response);
      }
    });

    return res.json({ msg: "Check Your Email to Reset Password", status: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.resetpass = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { newPassword } = req.body;

    // console.log(req.params);
    // console.log(newPassword);

    const user = await UsersListModel.findOne({ _id: id });

    if (!user) {
      return res.json({ msg: "No Registered Account found", status: false });
    }

    try {
      const secret = process.env.JWT_SECRET_KEY + user.password;

      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          return res.json({ msg: "Invalid Link or Expired", status: false });
        }

        // const passwordToHash = newPassword.newPassword; // Extract the actual password

        // Hash the new password
        try {
          const hash = await bcrypt.hash(newPassword, 10);

          // Update user's password in the database
          await UsersListModel.findByIdAndUpdate({ _id: id }, { password: hash });

          // Send success response
          res.json({ msg: "New Password is Set", status: true });
        } catch (hashError) {
          // Handle error while hashing
          console.error(hashError);
          res.json({ msg: "Error hashing the password", status: false });
        }
      });
    } catch (error) {
      console.error(error);
      res.json({ msg: "Reset Link not Verified", status: false });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports.sendEmailOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UsersListModel.findOne({ email });
    if (user) {
      return res.json({ msg: "Email is Already registered", status: false });
    }
     const otp = `${Math.floor(1000 + Math.random()*9000)}`
    //Sending an email
    var mailOptions = {
      from: "SWIFT TALK <mernwebdevelopment@gmail.com>",
      to: email,
      subject: "Email ID Verifiation",
      html: `
          <h3> Welcome </h3>
          <p>We wanted to express our sincere gratitude for choosing Swift Talk.</p>
          <h4>Here is The OTP for Email Verification , OTP will Expires in 10 minutes</h4>
          <h3><b>${otp}</b></h3>

          <p>If you not made this request , Please Ignore<p/
         
          <p>Best regards,<br>
          <b>The Swift Talk Team</b></p>
        `,
    };
    const hashedOtp = await bcrypt.hash(otp, 10); //hashing the otp
    const newOtpVerification = new userOtpVerification({
      email:email,
      otp:hashedOtp,
      createdAt:Date.now(),
       expiresAt:Date.now() + 600000,
    })
    //Save the otp for 10 minitues
    await newOtpVerification.save()
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent : " + info.response);
      }
    });

    return res.json({ msg: "Check Your Email For Verification", status: 'pending' , data :{email}});
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.verifyEmailOtp = async (req, res, next) =>{
  try {
    const { email, otp } = req.body;
    const otpInfo = await userOtpVerification.findOne({ email });
    if(!otpInfo){
      res.json({msg:"Something wrong", status: false})
    }
    if(otpInfo){
       const {expiresAt} = otpInfo
       const hashedOtp = otpInfo.otp
       if(expiresAt<Date.now()){
        //Otp expires
        await userOtpVerification.deleteMany({email})
        res.json({msg:"OTP has Expired. Please Request again", status: "Expired"})
       }else{
       const validOtp = bcrypt.compare(otp , hashedOtp)
       if(!validOtp){
        res.json({msg:"Wrong OTP , Check your Inbox", status: "wrong"})
       }else{
        await userOtpVerification.deleteMany({email})
        res.json({msg:"Email is Verified", status: true})
       }
       }
    }
    
  } catch (error) {
    console.log(error)
  }
}


module.exports.allusers = async (req, res, next) => {
  try {
    const users = await UsersListModel.find({
      _id: { $ne: req.params.id },
    }).select(["email", "username", "phoneNumber", "about", "socialLinks", "avatarImage", "_id"]);
    return res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.editprofile = async (req, res, next) => {
  try {
    const { userId, username, phoneNumber, about, facebookUrl , youtubeUrl,instagramUrl } = req.body;
    // console.log(facebookUrl,youtubeUrl,instagramUrl)
    const usernameCheck = await UsersListModel.findOne({
      _id: { $ne: userId }, // Exclude the current user with the specified userId
      username: username,
    });
  
    if (usernameCheck) {
      return res.json({ msg: "Username already exist", status: false });
    }
    let imageData = {
      filename: null,
      contentType: null,
      data: null,
    };
    
    if (req.files !== null) {
      imageData = {
        filename: req.files.avatarImage.name,
        contentType: req.files.avatarImage.mimetype,
        data: req.files.avatarImage.data,
      };
    }
    let socialLinks = {
      facebookUrl : facebookUrl,
      youtubeUrl : youtubeUrl,
      instagramUrl : instagramUrl
    };
    const updateFields = {
      username: username,
      phoneNumber: phoneNumber,
      about: about,
     socialLinks: socialLinks,
    };
    // console.log(updateFields)
   
    
    // Only include avatarImage in the updateFields if req.files is not null
    if (req.files !== null) {
      updateFields.avatarImage = imageData;
    }
    
    await UsersListModel.findByIdAndUpdate({ _id: userId }, updateFields)
    
    const updatedUser = await UsersListModel.findOne({ username }).select(["email", "username", "phoneNumber", "about", "socialLinks", "avatarImage", "_id"]);
    
    
    return res.json({
      msg: "Account Updated Successfully",
      status: true,
      user: updatedUser,
    });
    
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// module.exports.getAllUsersData