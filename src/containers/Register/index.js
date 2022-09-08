import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, NavLink } from "react-router-dom";
import { userRegister } from '../../actions';
import Loader from '../../components/Loader';

let Register = ({
    userRegister,
    user,
    loading
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(user) {
            navigate("/blogs");
        }
    },[user,navigate]);
    const [userForm,setUserForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        contactNumber: '',
        username: '',
        confirmPassword: ''
    });
    const [userFormError,setUserFormError] = useState({
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        contactNumber: null,
        username: null,
        confirmPassword: null
    });
    useEffect(() => {
        console.log(userForm,userFormError);
    },[userForm,userFormError]);
    const validationMap = {
        email: (value) => { 
            setUserFormError((state) => ({
                ...state,
                email: value.length === 0? 'Email is required': null
            })); 
        },
        password: (value) => {
            setUserFormError((state) => ({
                ...state,
                password: value.length === 0? 'Password is required': null
            }));
        },
        confirmPassword: (value) => {
            setUserFormError((state) => ({
                ...state,
                confirmPassword: userForm.password !== value? 'Passwords do not match': null
            }));
        },
        firstName: (value) => {
            setUserFormError((state) => ({
                ...state,
                firstName: value.length === 0? 'First Name is required': null
            }));
        },
        lastName: (value) => {
            setUserFormError((state) => ({
                ...state,
                lastName: value.length === 0? 'Last Name is required': null
            }));
        },
        username: (value) => {
            setUserFormError((state) => ({
                ...state,
                username: value.length === 0? 'Username is required': null
            }));
        },
        contactNumber: (value) => {
            setUserFormError((state) => ({
                ...state,
                contactNumber: value.length === 0? 'Contact Number is required':
                /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g.test(value)? '' : 'Enter a valid Indian contact number'
            }));
        }
    };
    const validateForm = () => {
        for (let key in validationMap) {
            validationMap[key](userForm[key]);
        }
        let valid = null;
        for (let key in userFormError) {
            valid = valid || userFormError[key];
        }
        return valid;
    };
    const register = () => {
        if(validateForm() === null) {
            userRegister(userForm);
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
    return (<div>
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
            <h1>Join Tweet App.</h1>
        </div>
        <div className="form">
            <div className="form-group">
                <input type="text" name="firstName" id="firstName" required className={`inputField ${userFormError.firstName? "error" : ""}`} autoComplete="off"
                    onChange={onChange} value={userForm.firstName} onBlur={onBlur}/>
                <label htmlFor="firstName">First Name</label>
                <small className="form-text text-danger">{userFormError.firstName? userFormError.firstName : ''}</small>
            </div>
            <div className="form-group">
                <input type="text" name="lastName" id="lastName" required className={`inputField ${userFormError.lastName? "error" : ""}`} autoComplete="off"
                onChange={onChange} value={userForm.lastName} onBlur={onBlur}/>
                <label htmlFor="lastName">Last Name</label>
                <small className="form-text text-danger">{userFormError.lastName? userFormError.lastName : ''}</small>
            </div>
            <div className="form-group">
                <input type="text" name="email" id="email" required className={`inputField ${userFormError.email? "error" : ""}`} autoComplete="off"
                onChange={onChange} value={userForm.email} onBlur={onBlur}/>
                <label htmlFor="email">Email</label>
                <small className="form-text text-danger">{userFormError.email? userFormError.email : ''}</small>
            </div>
            <div className="form-group">
                <input type="text" name="contactNumber" id="contactNumber" required className={`inputField ${userFormError.contactNumber? "error" : ""}`} autoComplete="off"
                onChange={onChange} value={userForm.contactNumber} onBlur={onBlur}/>
                <label htmlFor="contactNumber">Contact Number</label>
                <small className="form-text text-danger">{userFormError.contactNumber? userFormError.contactNumber : ''}</small>
            </div>
            <div className="form-group">
                <input type="text" name="username" id="username" required className={`inputField ${userFormError.username? "error" : ""}`} autoComplete="off"
                onChange={onChange} value={userForm.username} onBlur={onBlur}/>
                <label htmlFor="username">Username</label>
                <small className="form-text text-danger">{userFormError.username? userFormError.username : ''}</small>
            </div>
            <div className="form-group">
                <input type="password" name="password" id="password" required className={`inputField ${userFormError.password? "error" : ""}`} autoComplete="off"
                onChange={onChange} value={userForm.password} onBlur={onBlur}/>
                <label htmlFor="password">Password</label>
                <small className="form-text text-danger">{userFormError.password? userFormError.password : ''}</small>
            </div>
            <div className="form-group">
                <input type="password" name="confirmPassword" id="confirmPassword" required className={`inputField ${userFormError.confirmPassword? "error" : ""}`} autoComplete="off"
                onChange={onChange} value={userForm.confirmPassword} onBlur={onBlur}/>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <small className="form-text text-danger">{userFormError.confirmPassword? userFormError.confirmPassword : ''}</small>
            </div>
        </div>
        <button className="submitButton" onClick={register}>Sign Up</button>
        <div className="footer">
            <NavLink to="/login">Log in to existing account</NavLink>
        </div>
    </div>
    </Loader>
   </div>);
};

const mapDispatchToProps = {
    userRegister,
};

const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.loading
});

Register = connect(mapStateToProps,mapDispatchToProps)(Register);

export default Register;