
const axios = require('axios');

const getUsers = () =>
{
   return axios.get("http://apidev.tendermarket.co.il/api/accounts/GetUserDetails?userid=10")
}

// let obj = {
//    Firstname: 'sveta',
//    Lastname: 'or',
//    Phonenumber: '055-555555'
// }
const postUsers = async(userData) =>
{
  
   let result = null;
   try {
      console.log('Sending HTTP post to update user');
      result = await axios.post("http://apidev.tendermarket.co.il/api/accounts/PostUserDetails", userData);
      //console.log('HTTP post result: ', result );
   }
   catch (err)
   {
      console.log("Error: Failed to update user. Details: ", err);
   }
   
   console.log("postUsers returns: ", result.data.Success);
   return result.data.Success;
}

module.exports =  {getUsers, postUsers};