const jwt = require('jsonwebtoken');
require('dotenv').config();

const {processToken} = require ('../Sheared/exports_file')

module.exports.getAuth = (token) =>{
  try {
        if(!token) return "No token provided"
        let decoded = jwt.verify(token, processToken);
        return (decoded)
  } catch (error) {
    return error
  }
};

module.exports.setAuth = async(token) =>{
    try {
      //token should be a object like => {id:id}
        if(!token) return "No token provided";
        return await jwt.sign(token, processToken);
    } catch (error) {
        return error
    }
}