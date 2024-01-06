const { UsersListModel } = require("../../Database");

const bcrypt = require("bcrypt");

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
    const { username, email, password } = req.body;
    const usernameCheck = await UsersListModel.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already exist", status: false });
    }
    const emailCheck = await UsersListModel.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already exist", status: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UsersListModel.create({
      username,
      email,
      password: hashPassword,
    });

    // Create a user object without the password field
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
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
// module.exports.forgetpass = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const user = await UsersListModel.findOne({ email });
//     if (!user) {
//       return res.json({ msg: "No Registered Account found", status: false });
//     }
//     const password = 
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

module.exports.allusers = async (req, res, next) => {
  try {
    const users = await UsersListModel.find({
      _id: { $ne: req.params.id },
    }).select(["email", "username", "avatarImage", "_id"]);

    return res.json(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.editprofile = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await UsersListModel.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already exist", status: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    //  const user  = await UsersListModel.findByIdAndUpdate({_id:userId},{
    //   username : username,
    //   password : hashPassword
    //  })

    // Create a user object without the password field
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
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
