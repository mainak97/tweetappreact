import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword,verifyToken } from '../../actions';
import Loader from '../../components/Loader';

let ResetPassword = ({
    resetPassword,
    loading,
    user,verifyToken,error
}) => {
    const params = useParams();
    const navigate = useNavigate();
    const [modalOpen,setModalOpen] = useState(false);
    useEffect(() => {
        if(user) {
            navigate("/tweets");
        }
    },[user,navigate]);
    useEffect(() => {
        verifyToken({ token: params.token });
    },[params.token]);
    useEffect(() => {
        if(error) {
            setModalOpen(true);
        }
    },[error]);
    const [userForm,setUserForm] = useState({
        password: '',
        confirmPassword: ''
    });
    const [userFormError,setUserFormError] = useState({
        password: null,
        confirmPassword: null
    });
    const validationMap = {
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
    const reset = () => {
        const formValidation = validateForm();
        if(formValidation === null) {
            resetPassword({ password: userForm.password, token: params.token });
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
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: modalOpen? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message</h5>
              </div>
              <div className="modal-body">
                <p>{error}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => {
                    setModalOpen(false);
                    navigate('/login');    
                }}>OK</button>
              </div>
            </div>
          </div>
        </div>
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
            <button className="submitButton" onClick={reset}>Reset Password</button>
        </div>
    </div>
    </Loader>
    </React.Fragment>);
};

const mapDispatchToProps = {
    resetPassword,verifyToken
};

const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.loading,
    error: state.verifyTokenError
});
ResetPassword = connect(mapStateToProps,mapDispatchToProps)(ResetPassword);

export default ResetPassword;