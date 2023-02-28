const User = require('./db');
const bcrypt = require('bcrypt')

module.exports = getAlluser = async(req, res, next)=>{
   let users;
   try{
       users = await User.find();
   }catch(err){
    return console.log(err)
   }
   if(!users){
    return res.status(404).json({"message":"user not found"});
   }
   return res.status(200).json({users})
}
module.exports = createUser = async(req, res, next)=>{
    const{ name, email, password, bio } = req.body
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
       return console.log(err)
    }
    if(existingUser){
        return res.status(400).json({"message":"user already exist"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User ({
        name,
        email, 
        password: hashedPassword,
        bio,
        blogs:[]
    })
    try{
        await user.save()
    }catch(err){
       return console.log(err)
    }
    return res.status(201).json({user})
}
module.exports = login = async(req, res, next)=>{
    const{email, password} = req.body
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
       return console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({"message":"user does not exist...signup instead!"})
    }

    const matchPassword = bcrypt.compareSync(password, existingUser.password)
    if(!matchPassword){
        return res.status(400).json({"message":"password dont match"})
    }
    return res.status(200).json({"message": "login successfull"})

}



