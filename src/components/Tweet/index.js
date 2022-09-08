import { useState } from "react";

const Tweet = (props) => {
    const formatTime = (time) => {
        if(time) {
            return `${new Date(time).toLocaleDateString()} ${new Date(time).toLocaleTimeString()}`;
        }
        return '';
    };
    const [editing,setEditing] = useState(false);
    const [replying,setReplying] = useState(false);
    const [tweetText,setTweetText] = useState('');
    const [replyText,setReplyText] = useState('');
    const [deleteModalOpen,setDeleteModalOpen] = useState(false);

    const onEdit = () => {
        setEditing((e) => !e);
        setTweetText(props.tweet.body);
    };
    const editText = (text) => {
        if(text.length<=144) {
            setTweetText(text);
        }
    };
    return (<div>
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: deleteModalOpen? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this tweet?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => {
                    props.deleteTweet({ ...props.tweet });
                    setDeleteModalOpen(false);
                }}>Yes</button>
                <button type="button" className="btn btn-secondary" onClick={() => setDeleteModalOpen(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
        <section style={{
            padding: '14px 14px 8px',
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
            <div className='content'>
                <div className='name_and_date' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <span className='name' >{props.tweet.fullName}</span>
                    <span className='id' style={{ fontWeight: 'bold', marginLeft: '0.25em' }}>@{props.tweet.userId}</span>
                    <span className='date' style={{ marginLeft: '2em' }}>{formatTime(props.tweet.timePosted)}</span>
                </div>
                {editing? <div className='tweetbox__input'>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <textarea value={tweetText} onChange={(e) => editText(e.target.value)} style={{ border: '1px solid gray', padding: '1em', width: '500px' }} maxLength={144} />
                    <div style={{ marginLeft: '1em',alignSelf: 'flex-end' }}>{`${tweetText.length}/144`}</div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="tweetBox__tweetButton" style={{ marginLeft: '0' }}
                            onClick={() => props.editTweet({
                               ...props.tweet,
                               body: tweetText 
                            })}>Update</button>
                        <button className="tweetBox__tweetButton"
                            style={{ marginLeft: '1em', border: '1px solid #50b7f5', backgroundColor: '#fff', color: '#50b7f5' }}
                            onClick={onEdit}>Cancel</button>
                    </div>
                    </div>
                </div> :
                <p className='tweet_text' style={{ textAlign: 'left' }}>
                    {props.tweet.body}
                </p>}
                {editing? null : <div className='actions'>
                    <ul className='actions_list'  style={{ 
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingLeft: '0'
                }}>

                        <li style={{ marginLeft: '2em', cursor: 'pointer' }}
                            onClick={() => props.likeTweet({ 
                                ...props.tweet
                            })}>{
                                props.tweet.likes && props.tweet.likes.includes(props.user.user.username)? 
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 3.314C14.438-1.248 25.534 6.735 10 17-5.534 6.736 5.562-1.248 10 3.314z" clipRule="evenodd"/></svg>
                                : <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 4.748l-.717-.737C7.6 2.281 4.514 2.878 3.4 5.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.837-3.362.314-4.385-1.114-2.175-4.2-2.773-5.883-1.043L10 4.748zM10 17C-5.333 6.868 5.279-1.04 9.824 3.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C14.72-1.042 25.333 6.867 10 17z" clipRule="evenodd"/></svg>
                                }</li>
                        {props.tweet.likes?.length}
                        <li style={{ marginLeft: '2em', cursor: 'pointer' }}
                            onClick={() => {
                                setReplying(true);
                                setReplyText(''); 
                            }}><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.207 13.293L7.5 14a5.5 5.5 0 110-11h5a5.5 5.5 0 110 11s-1.807 2.169-4.193 2.818C7.887 16.933 7.449 17 7 17c.291-.389.488-.74.617-1.052C8.149 14.649 7.5 14 7.5 14c.707-.707.708-.707.708-.706h.001l.002.003.004.004.01.01a1.184 1.184 0 01.074.084c.039.047.085.108.134.183.097.15.206.36.284.626.114.386.154.855.047 1.394.717-.313 1.37-.765 1.895-1.201a10.266 10.266 0 001.013-.969l.05-.056.01-.012m0 0A1 1 0 0112.5 13a4.5 4.5 0 100-9h-5a4.5 4.5 0 000 9 1 1 0 01.707.293" clipRule="evenodd"/></svg></li>
                        {props.tweet.replies?.length}
                        <li style={{ marginLeft: '2em', cursor: 'pointer' }}>
                            {props.tweet.userId === props.user.user.username? <svg onClick={onEdit}
                            width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd"/>
                                <path fillRule="evenodd" d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z" clipRule="evenodd"/>
                            </svg>:null}
                        </li>
                        <li style={{ marginLeft: '2em', cursor: 'pointer '}}>
                            {props.tweet.userId === props.user.user.username? <svg onClick={() => { setDeleteModalOpen(true); }}
                                width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 7.5A.5.5 0 018 8v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V8z"/>
                                <path fill-rule="evenodd" d="M16.5 5a1 1 0 01-1 1H15v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6h-.5a1 1 0 01-1-1V4a1 1 0 011-1H8a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM6.118 6L6 6.059V15a1 1 0 001 1h6a1 1 0 001-1V6.059L13.882 6H6.118zM4.5 5V4h11v1h-11z" clip-rule="evenodd"/>
                            </svg> : null}
                        </li>
                    </ul>
                </div>}
                {
                    replying? <div className='tweetbox__input'>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} style={{ border: '1px solid gray', padding: '1em', width: '500px' }} maxLength={144} />
                    <div style={{ marginLeft: '1em',alignSelf: 'flex-end' }}>{`${replyText.length}/144`}</div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="tweetBox__tweetButton" style={{ marginLeft: '0' }}
                            onClick={() => { props.replyTweet({
                               ...props.tweet,
                               reply: replyText 
                            });
                            setReplying(false);
                            }}>Reply</button>
                        <button className="tweetBox__tweetButton"
                            style={{ marginLeft: '1em', border: '1px solid #50b7f5', backgroundColor: '#fff', color: '#50b7f5' }}
                            onClick={() => setReplying(false)}>Cancel</button>
                    </div>
                    </div>
                </div> : null
                }
                {props.tweet.replies? 
                        props.tweet.replies.map((reply,index) => <div key={`${props.tweet.id}_${index}`} style={{ display: 'flex' }}><img
                        src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                        alt=""
                        style={{
                        borderRadius: '50%',
                        height: '40px'
                    }}
                    /><div className='content' style={{ marginLeft: '1em' }}>
                        <div className='name_and_date' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <span className='name' >{reply.fullName}</span>
                            <span className='id' style={{ fontWeight: 'bold', marginLeft: '0.25em' }}>@{reply.username}</span>
                            <span className='date' style={{ marginLeft: '2em' }}>{formatTime(reply.timestamp)}</span>
                        </div>
                        <p className='tweet_text' style={{ textAlign: 'left' }}>
                            {reply.reply}
                        </p>
                        </div></div>)
                    :null}
            </div>
        </section>
    </div>);
};
export default Tweet;