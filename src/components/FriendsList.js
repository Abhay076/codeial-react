import React from 'react';
import { FriendsListItem } from './';

const FriendsList = (props) => {
  console.log('Props',props);
  return (
    <div className="friends-list">
      <div className="header">Friends</div>

      {props.friends && props.friends.length === 0 && (
        <div className="no-friends">No friends found!</div>
      )}
       {/* props.friends.length !== 0 &&  */}
      {props.friends && props.friends.length !== 0 && 
        props.friends.map((friend) => (
          <FriendsListItem friend={friend.to_user} key={friend._id} />
        ))}
        {/* <FriendsListItem friend={{
          _id:"630cb38caca8127d5b593ff5",
          email:"abc@abc.com"
          
        }}/> */}
    </div>
  );
};

export default FriendsList;
