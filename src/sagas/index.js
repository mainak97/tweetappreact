import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { store } from '..';

function* userLogin(action) {
    try {
        const json = yield axios.post('http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/login', {
            username: action.username,
            password: action.password
        },{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "USER_LOGIN_SUCCESS", payload: json });;
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* userRegister(action) {
    try {
        const json = yield axios.post('http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/register', {
            email: action.email,
            password: action.password,
            firstName: action.firstName,
            lastName: action.lastName,
            username: action.username,
            contactNumber: action.contactNumber
        },{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "USER_REGISTER_SUCCESS", payload: json });;
        yield put({ type: "API_ERROR", payload: 'Registration was successful' });
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}
function* getTweets(action) {
    const user = store.getState().user;
    console.log(user);
    try {
        const json = yield axios.get(action.payload? `http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/${action.payload}`
        : 'http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/all', {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "GET_TWEETS_SUCCESS", payload: json.tweets });;
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* putTweet(action) {
    const user = store.getState().user;
    console.log(user);
    try {
            const json = yield axios.put(`http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/${user.user.username}/update/${action.payload.id}`, {
            ...action.payload
            },{
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            }
            }).then(response => { 
                return response.data; 
            });
            yield put({ type: "PUT_TWEET_SUCCESS", payload: json });
            yield put({ type: "API_ERROR", payload: 'The tweet was edited successfully' });
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* postTweet(action) {
    const user = store.getState().user;
    console.log(user);
    try {
        const json = yield axios.post(`http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/${user.user.username}/add`, {
            body: action.payload,
            username: user.user.username
        },{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "POST_TWEET_SUCCESS", payload: json });
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* likeTweet(action) {
    const user = store.getState().user;
    console.log(user);
    try {
        const json = yield axios.put(`http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/${user.user.username}/like/${action.payload.id}`, {
        },{
        method: "put",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "LIKE_TWEET_SUCCESS", payload: json });
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* replyTweet(action) {
    const user = store.getState().user;
    console.log(user);
    try {
        const json = yield axios.post(`http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/${user.user.username}/reply/${action.payload.id}`, {
            username: user.user.username,
            reply: action.payload.reply
        },{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "REPLY_TWEET_SUCCESS", payload: json });
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* deleteTweet(action) {
    const user = store.getState().user;
    console.log(user);
    try {
        const json = yield axios.delete(`http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/${user.user.username}/delete/${action.payload.id}`, {
        method: "delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "DELETE_TWEET_SUCCESS", payload: json });
        yield put({ type: "API_ERROR", payload: "Tweet was deleted successfully" });
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* getUsers(action) {
    const user = store.getState().user;
    console.log(user);
    try {
        const json = yield axios.get(
            action.payload? `http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/user/search/${action.payload}`
            : `http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/users/all`, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "GET_USERS_SUCCESS", payload: json.users });
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* forgotPassword(action) {
    const user = store.getState().user;
    console.log(user);
    try {
        const json = yield axios.post('http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/forgot_password', {
            email: action.payload.username
        },{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "FORGOT_PASSWORD_SUCCESS", payload: json });
        yield put({ type: "API_ERROR", payload: 'An email with a reset link was sent successfully' });
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* verifyToken(action) {
    const user = store.getState().user;
    console.log(user);
    try {
        yield axios.get('http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/reset_password', {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': action.payload.token
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "API_ERROR", payload: null });
    } catch(err) {
        console.log(err);
        yield put({ type: "VERIFY_TOKEN_ERROR", payload: 'Invalid Token' });
    }
}

function* resetPassword(action) {
    const user = store.getState().user;
    console.log(user);
    try {
        yield axios.post('http://ec2-34-216-167-158.us-west-2.compute.amazonaws.com:8080/api/v1.0/tweets/reset_password', {
            token: action.payload.token,
            password: action.payload.password
        },{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        }).then(response => { 
            return response.data; 
        });
        yield put({ type: "API_ERROR", payload: null });
        yield put({ type: "VERIFY_TOKEN_ERROR", payload: "Password was changed successfully" });
    } catch(err) {
        console.log(err);
        yield put({ type: "API_ERROR", payload: err.response?.data?.errorMsg });
    }
}

function* actionWatcher() {
  yield takeLatest('USER_LOGIN', userLogin);
  yield takeLatest('USER_REGISTER', userRegister);
  yield takeLatest('GET_TWEETS', getTweets);
  yield takeLatest('PUT_TWEET', putTweet);
  yield takeLatest('POST_TWEET',postTweet);
  yield takeLatest('LIKE_TWEET',likeTweet);
  yield takeLatest('SILENT_LOAD_TWEETS', getTweets);
  yield takeLatest('REPLY_TWEET',replyTweet);
  yield takeLatest('DELETE_TWEET',deleteTweet);
  yield takeLatest('GET_USERS',getUsers);
  yield takeLatest('FORGOT_PASSWORD',forgotPassword);
  yield takeLatest('VERIFY_TOKEN', verifyToken);
  yield takeLatest('RESET_PASSWORD', resetPassword);
}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}