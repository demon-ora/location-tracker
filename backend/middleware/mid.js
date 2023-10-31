const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });



const getUserIdFromToken = (req, res, next) => {
  const token = req.header('Authorization');


  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  

  try {
    console.log("ok");
    var env = prcess.env.SECRET_KEY;
    console.log(env);
    console.log("hi");
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    console.log(decoded);
    // req.userId = decoded.user.id; // Extract the user ID from the token
    // console.log(req.userId);
    const rootUser =  User.findOne({_id:verifyToken._id,"tokens.token":token});
    if(!rootUser){
        throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    console.log("hello");
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = getUserIdFromToken;