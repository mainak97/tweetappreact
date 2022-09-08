import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import { forgotPassword } from '../../actions';
import Loader from '../../components/Loader';

let ForgotPassword = ({
    forgotPassword,
    user,
    loading
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(user) {
            navigate("/tweets");
        }
    },[user,navigate]);
    const [userForm,setUserForm] = useState({
        username: ''
    });
    const [userFormError,setUserFormError] = useState({
        username: null
    });
    const validationMap = {
        username: () => { 
            setUserFormError((state) => ({
                ...state,
                username: userForm.username.length === 0? 'Email is required': null
            })); 
        }
    };
    const validateForm = () => {
        for (let key in validationMap) {
            validationMap[key]();
        }
        let valid = null;
        for (let key in userFormError) {
            valid = valid || userFormError[key];
        }
        return valid;
    };
    const reset = () => {
        const formValidation = validateForm();
        if(formValidation === null) {
            forgotPassword({ username: userForm.username });
        }
    };
    const onChange = (event) => {
        setUserForm((state) => ({ ...state,
            [event.target.id]: event.target.value
        }));
    };
    const onBlur = (event) => {
        validationMap[event.target.id](event.target.value);
    };
    return (<React.Fragment>
        <Loader loading={loading}>
        <div className="container w-25">
        <div className="header">
            <svg viewBox="0 0 24 24" fill="rgb(29, 161, 242)" width="40" height="40">
                <g>
                    <path
                        d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">
                    </path>
                </g>
            </svg>
            <h1>Reset Password</h1>
        </div>
        <div className="form">
            <div className="form-group">
                <input type="text" name="username" id="username" required className={`inputField ${userFormError.username? "error" : ""}`} autoComplete="off"
                onChange={onChange} value={userForm.username} onBlur={onBlur} />
                <label htmlFor="username">Email</label>
                <small className="form-text text-danger">{userFormError.username? userFormError.username : ''}</small>
            </div>
            <button className="submitButton" onClick={reset}>Reset Password</button>
        </div>
        <div className="footer">
            <NavLink to="/login">Log in</NavLink>
            <span>.</span>
            <NavLink to="/register">Sign up for Tweet App</NavLink>
        </div>
    </div>
    </Loader>
    </React.Fragment>);
};

const mapDispatchToProps = {
    forgotPassword
};

const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.loading
});
ForgotPassword = connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);

export default ForgotPassword;