import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions';
import Loader from '../../components/Loader';
import { useParams, useNavigate } from 'react-router-dom';

let Users = ({
    getUsers,loading,users
}) => {
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getUsers(params.searchedUser);
    },[getUsers,params.searchedUser]);
    return (<div className="dashboard-container">
        <Loader loading={loading}>
            <div style={{ width: '100%', marginTop: '-2em' }}>
            <h2 style={{
                textAlign: 'left'
            }}>Tweet App Users</h2>
                {users?.map((user) => <div>
                    <section style={{
            padding: '4em',
            display: 'flex',
            gap: '15px',
            fontSize: '15px',
            borderBottom: '1px solid #e6ecf0'
        }}>
            <img
              src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
              alt=""
              style={{
                borderRadius: '50%',
                height: '40px'
              }}
            />
            <div className='content' style={{ cursor: 'pointer' }} onClick={() => navigate(`/tweets/${user.username}`)}>
                <div className='name_and_date' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <span className='name' >{`${user.firstName} ${user.lastName}`}</span>
                    <span className='id' style={{ fontWeight: 'bold', marginLeft: '0.25em' }}>@{user.username}</span>
                </div>
            </div>
            </section>
            </div>)}
            {users?.length === 0? <div>
                <h3>No users found</h3>
            </div> : null}
            </div>  
      </Loader>
      </div>);
};

const mapDispatchToProps = {
    getUsers
};

const mapStateToProps = (state) => ({
    user: state.user,
    users: state.users
});
Users = connect(mapStateToProps,mapDispatchToProps)(Users);

export default Users;