import './App.css';
import { Routes, Route, NavLink, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './containers/Login';
import { connect } from 'react-redux';
import Register from './containers/Register';
import ForgotPassword from './containers/ForgotPassword';
import { useEffect, useState } from 'react';
import { removeApiError,logOut } from './actions';
import Dashboard from './containers/Dashboard';
import Users from './containers/Users';
import ResetPassword from './containers/ResetPassword';

let App = ({
  user,
  apiError,
  removeApiError,
  logOut
}) => {
  const [modalOpen,setModalOpen] = useState(false);
  const [userSearchText,setUserSearchText] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    console.log("apiERR",apiError);
    setModalOpen(apiError? true : false);
  },[apiError]);
  return (
      <div className="App">
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: modalOpen? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message</h5>
              </div>
              <div className="modal-body">
                <p>{apiError}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={removeApiError}>Close</button>
              </div>
            </div>
          </div>
        </div>
        {user?
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand"><svg viewBox="0 0 24 24" fill="rgb(29, 161, 242)" width="40" height="40">
                <g>
                    <path
                        d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">
                    </path>
                </g>
            </svg> Tweet App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/tweets">Tweets</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">All Users</NavLink>
              </li>
            </ul>
            <div className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search User" aria-label="Search" value={userSearchText}
              onChange={(e) => setUserSearchText(e.target.value)}/>
              <button className="btn btn-outline-primary" onClick={() => navigate(`/users/${userSearchText}`)}>Search</button>
            </div>
            <ul className="navbar-nav">
                <li className="d-flex flex-row-reverse bd-highlight">
                  <NavLink className="nav-link" aria-current="page" onClick={logOut} to="">Log out</NavLink>
                </li>
            </ul>
          </div>
        </div>
      </nav> : null}
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tweets" element={<PrivateRoute Component={Dashboard} user={user}/>} />
              <Route path="/tweets/:username" element={<PrivateRoute Component={Dashboard} user={user}/>} />
              <Route path="/users" element={<PrivateRoute Component={Users} user={user}/>} />
              <Route path="/users/:searchedUser" element={<PrivateRoute Component={Users} user={user}/>} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/reset_password/:token" element={<ResetPassword />} />
            </Routes>
      </div>
  );
};


const PrivateRoute = ({
  Component,user
}) => {
  if(user) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
  apiError: state.apiError
});

const mapDispatchToProps = {
  removeApiError,
  logOut
};

App = connect(mapStateToProps,mapDispatchToProps)(App);

export default App;
