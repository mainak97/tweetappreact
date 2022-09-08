const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
        case 'USER_REGISTER':
        case 'GET_TWEETS':
        case 'POST_TWEET':
        case 'PUT_TWEET':
        case 'DELETE_TWEET':
        case 'FORGOT_PASSWORD':
            return { ...state, loading: true };
        case 'USER_LOGIN_SUCCESS':
            return { ...state, user: action.payload, loading: false };
        case 'USER_REGISTER_SUCCESS':
            return { ...state, loading: false, registerSuccess: action.payload };
        case 'API_ERROR':
            return { ...state, loading: false, apiError: action.payload };
        case 'REMOVE_API_ERROR':
            return { ...state, apiError: undefined };
        case 'LOG_OUT':
            return { ...state, user: undefined };
        case 'GET_TWEETS_SUCCESS':
            return { ...state, tweets: action.payload, loading: false };
        case 'POST_TWEET_SUCCESS':
        case 'PUT_TWEET_SUCCESS':
        case 'LIKE_TWEET_SUCCESS':
        case 'REPLY_TWEET_SUCCESS':
        case 'DELETE_TWEET_SUCCESS':
        case 'FORGOT_PASSWORD_SUCCESS':
            return { ...state, loading: false, apiSuccess: action.payload };
        case 'GET_USERS_SUCCESS':
            return { ...state, loading: false, users: action.payload };
        case 'VERIFY_TOKEN_ERROR':
            return { ...state, loading: false, verifyTokenError: action.payload };
        default:
            return state;
    }
  };
  
  export default reducer;