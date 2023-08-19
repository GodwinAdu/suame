import axios from "axios";


// authenticate user
export async function authenticate(email){
  try {
     return await axios.post(`https://suame-backend.onrender.com/api/authenticate`,{email})
  } catch (error) {
    return {error:"email doestn't exist ...!"}
  }
}

// get user details
export async function getUser(email){
  try {
    const {data} = await axios.get(`https://suame-backend.onrender.com/api/user/${email}`)
    return {data}
  } catch (error) {
    return {error: "User doesn't exist ..."}
  }
}

// get user details for profile
// get user details
export async function getGroupUser(overseerProfile){
  try {
    const { data } = await axios.get(`https://suame-backend.onrender.com/api/getGroupUser`);
    return {data}
  } catch (error) {
    return {error: "User doesn't exist ..."}
  }
}

// get user details for profile
export async function getUserProfile({userId}){
  try {
    const {data} = await axios.get(`https://suame-backend.onrender.com/api/userProfile/${userId}`)
    return {data}
  } catch (error) {
    return {error: "User doesn't exist ..."}
  }
}

// Register users
export async function registerUser(credentials) {
    try {
      const { data,status } = await axios.post(
        `https://suame-backend.onrender.com/api/register`,
        credentials
      );
      // let { firstName, email } = credentials;
  
      // if (status === 201) {
      //   await axios.post(`/api/registerMail`, { firstName, userEmail: email, text: msg });
      // }
      return Promise.resolve(data);
    } catch (error) {
      console.error('Error in registerUser:', error);
      return Promise.reject({ success: false, message: "An error occurred while processing your request", error })
    }
  }
  
export async function login(email,password){
    try {
          const { data } = await axios.post(
            `https://suame-backend.onrender.com/api/login`,
            {email,password}
            );
          return Promise.resolve({data})
        
    } catch (error) {
      console.error('Error in loginuser:', error);
        return Promise.reject({error: "password doesnt match ..."})
        
    }
}

// send report to sanity
export async function createOrUpdateReport(values){
  try {
    const { data } = await axios.post(
      `https://suame-backend.onrender.com/api/report`,
      values
    )

    return Promise.resolve(data)
  } catch (error) {
    console.error('Error in sending report', error)
    return Promise.reject({error: "something went wrong while sending report"})
  }
}

// updateUser function
export async function updateUser(token, response) {
  try {
    const data = await axios.put(
      'https://suame-backend.onrender.com/api/updateUser',
      response,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: 'Could not update profile' });
  }
}

// generate otp
export async function generateOTP(){
  try {
    const {data : {code},status } = await axios.get(`https://suame-backend.onrender.com/api/generateOTP`,{params: {email}})

    if(status === 200 ){
      let { data : {email}} = await getUser({email})
      let text = `Your password recovery OTP is ${code}. Verify and recover your password`;
      await axios.post(`https://suame-backend.onrender.com/api/registerMail`,{firName, userEmail:email, text, subject:"Password Recovery OTP"})
      return Promise.resolve({code})
    }
  } catch (error) {
    return Promise.reject({error })
  }
}