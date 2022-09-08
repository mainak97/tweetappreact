import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { postTweet, getTweets, likeTweet,silentLoadTweets,editTweet,replyTweet,deleteTweet } from '../../actions';
import Tweet from '../../components/Tweet';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';

let Dashboard = ({
    postTweet,apiSuccess,tweets,getTweets,loading,likeTweet,user,silentLoad,editTweet,replyTweet,deleteTweet,
    users
}) => {
    const [tweet,setTweet] = useState('');
    const params = useParams();
    const [profile,setProfile] = useState({});
    useEffect(() => {
        if(apiSuccess) {
          setTweet('');
          silentLoad(params.username);
        }
    },[apiSuccess,silentLoad]);
    useEffect(() => {
      getTweets(params.username);
      setProfile(users?.filter((u) => u.username === params.username)[0]);
    },[getTweets,params.username]);
    return (<div className="dashboard-container">
        <Loader loading={loading}>
    <div className="feed">
      <div className="tweetBox">
        {params.username? 
        <section style={{
          padding: '1em',
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
          <div className='content' style={{ cursor: 'pointer' }}>
              <div className='name_and_date' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <span className='name'><h4>{`${profile.firstName} ${profile.lastName}`}</h4></span>
                  <span className='id' style={{ fontWeight: 'bold', marginLeft: '0.25em',marginTop: '0.4em' }}>@{profile.username}</span>
              </div>
          </div>
          </section>
        : null}
        {params.username === undefined || params.username === user.user.username? <div className="form">
          <div className="tweetbox__input">
            <img
              src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
              alt=""
            />
            <input type="text" placeholder="What's happening?" value={tweet} onChange={(e) => {
                if(e.target.value.length <= 144) {    
                    setTweet(e.target.value);
                } }}/>
          </div>
            <div className="character_count">{tweet.length}/144</div>
            <button className="tweetBox__tweetButton" onClick={() => postTweet(tweet)}>Tweet</button>
        </div> : null}
        {tweets? tweets.map((tweet) => <div key={tweet.id}><Tweet tweet={tweet} likeTweet={likeTweet} user={user}
          editTweet={editTweet} replyTweet={replyTweet} deleteTweet={deleteTweet}/></div>):null}
        {tweets?.length === 0? <div><h2>{params.username === user.user.username? 'You have no tweets' : 'This user has no tweets'}</h2></div>:null}
      </div>
      </div>
      </Loader>
      </div>);
};

const mapDispatchToProps = {
    postTweet,
    getTweets,
    likeTweet,silentLoad: silentLoadTweets,
    editTweet,replyTweet, deleteTweet
};

const mapStateToProps = (state) => ({
    user: state.user,
    tweets: state.tweets,
    apiSuccess: state.apiSuccess,
    loading: state.loading,
    users: state.users
});
Dashboard = connect(mapStateToProps,mapDispatchToProps)(Dashboard);

export default Dashboard;