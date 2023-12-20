const { UsersListModel } = require("../../Database")

const bcrypt = require("bcrypt")

module.exports.register = async (req,res,next) =>{
try {
 const  {username, email, password} = req.body
  const usernameCheck = await UsersListModel.findOne({username})
  if(usernameCheck){
    return res.json({msg:"Username already exist", status:false})
  }
  const emailCheck = await UsersListModel.findOne({email})
  if(emailCheck){
    return res.json({msg:"Email already exist", status:false})
  }

  const hashPassword = await bcrypt.hash(password,10)

  const user  = await UsersListModel.create({
    username, email, password:hashPassword
  })

  delete user.password;
  return res.json({msg:"Account Created Succesfully", status:true, user})
} catch(err){
    console.log(err);
 next(err)
}
}


module.exports.login = async (req,res,next) =>{
try {
 const  {username,password} = req.body
  const user = await UsersListModel.findOne({username})
  if(!user){
    return res.json({msg:"Wrong Username", status:false})
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if(!isPasswordValid){
    return res.json({msg:"Incorrect Password", status:false})
  }
  delete user.password;
  return res.json({msg:"Login Succesfully", status:true, user})
} catch(err){
    console.log(err);
 next(err)
}
}