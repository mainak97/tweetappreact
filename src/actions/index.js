export const userLogin = (username,password) => ({
    type: 'USER_LOGIN',
    username,
    password
  });
export const userRegister = ({ email, password, firstName, lastName, 
  contactNumber, username }) => ({
    type: 'USER_REGISTER',
    email,password,firstName,lastName,contactNumber,username
  });
export const removeApiError = () => ({
    type: 'REMOVE_API_ERROR'
  });
export const logOut = () => ({
    type: 'LOG_OUT'
  });
export const getTweets = (payload) => ({
    type: 'GET_TWEETS',
    payload
  });
export const getTweetsSuccess = (payload) => ({
  type: 'GET_TWEETS_SUCCESS',
  payload
});
export const postTweet = (payload) => ({
  type: 'POST_TWEET',
  payload
});
export const editTweet = (payload) => ({
  type: 'PUT_TWEET',
  payload
});
export const likeTweet = (payload) => ({
  type: 'LIKE_TWEET',
  payload
});
export const silentLoadTweets = (payload) => ({
  type: 'SILENT_LOAD_TWEETS',
  payload
});
export const replyTweet = (payload) => ({
  type: 'REPLY_TWEET',
  payload
});
export const deleteTweet = (payload) => ({
  type: 'DELETE_TWEET',
  payload
});
export const getUsers = (payload) => ({
  type: 'GET_USERS',
  payload
});
export const forgotPassword = (payload) => ({
  type: 'FORGOT_PASSWORD',
  payload
});
export const resetPassword = (payload) => ({
  type: 'RESET_PASSWORD',
  payload
});
export const verifyToken = (payload) => ({
  type: 'VERIFY_TOKEN',
  payload
});
