// import React, { Component } from 'react';
// // import {useParams} from 'react-router-dom'
// import { fetchUserProfile } from '../actions/profile';
// import { connect } from 'react-redux';
// class UserProfile extends Component {
//   componentDidMount() {
//     // const {match} = this.props;
//     // if(match.useParams.userId){
//     //     //
//     // }
//     // const { id } = useParams();
//     // const params = useParams();
//     const { match } = this.props;

//     if (match.params.userId) {
//       // dispatch an action
//       this.props.dispatch(fetchUserProfile(match.params.userId));

//   }
//   }
//   render() {
//     // const {
//     //   match: { params },
//     // } = this.props;
//     // console.log('this.props', params);
//     // const {match:{params}} = this.props;
//     const {
//               match: { params },
//               profile,
//             } = this.props;
//             console.log('this.props', params);
//             const user = profile.user;

//             if (profile.inProgress) {
//               return <h1>Loading!</h1>;
//             }
//     return (
//       <div className="settings">
//         <div className="img-container">
//           <img
//             src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
//             alt="user-dp"
//           />
//         </div>

//         <div className="field">
//           <div className="field-label">Name</div>
//           <div className="field-value">{user.name}</div>
//         </div>

//         <div className="field">
//           <div className="field-label">Email</div>
//           <div className="field-value">{user.email}</div>
//         </div>

//         <div className="btn-grp">
//           <button className="button save-btn">Add Friend</button>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(profile) {
//   return {
//     profile,
//   };
// }
// export default connect(mapStateToProps)(UserProfile);

// your code
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend} from '../actions/friends';
import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';

// react-router-dom v6
//If using RRDv6 then there is no match prop. Gone are the route props. Here only the useParams and other //hooks exist, so use them.

const UserProfile = (props) => {
  console.log(props);
  let [success, setSuccess] = useState(null);
  let [error, setError] = useState(null);
  let [successMessage, setSuccessMessage] = useState(null);

  const id = useParams().userId;
  useEffect(() => {
    if (id) {
      // dispatch an action
      props.dispatch(fetchUserProfile(id));
    }
  }, [id]);

  const { profile } = props;
  const user = profile.user;

  const checkIfUserIsAFriend = () => {
    const { friends } = props;
    const index = friends?.map((friend) => friend.to_user._id).indexOf(id);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleAddFriendClick = async () => {
    const url = APIUrls.addFriend(id);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    if (data.success) {
      setSuccess(true);
      setSuccessMessage('Added friend successfully!');
        props.dispatch(addFriend(data.data.friendship));
    } else {
      setSuccess(false);
      setError(data.message);
    }
  };

  const handleRemoveFriendClick = async () => {
    const url = APIUrls.removeFriend(id);

    const extra = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, extra);
    const data = await response.json();
    console.log('await data', data);

    if (data.success) {
      // show user message

      setSuccess(true);
      setSuccessMessage('Removed friends successfully!');
      //   props.dispatch(removeFriend(id));
    } else {
      setSuccess(null);
      setError(data.message);
    }
  };
  if (profile.inProgress) {
    return <h1>Loading!</h1>;
  }
  // const isUserFriend = this.checkIfUserIsAFriend();
  return (
    <div className="settings">
      <div className="img-container">
        <img
          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
          alt="user-dp"
        />
      </div>
      <div className="field">
        <div className="field-label">Name</div>
        <div className="field-value">{user.name}</div>
      </div>
      <div className="field">
        <div className="field-label">Email</div>
        <div className="field-value">{user.email}</div>
      </div>
      <div className="btn-grp">
        {!checkIfUserIsAFriend() ? (
          <button
            className="button save-btn"
            onClick={() => handleAddFriendClick()}
          >
            Add Friend
          </button>
        ) : (
          <button
            className="button save-btn"
            onClick={() => handleRemoveFriendClick()}
          >
            Remove Friend
          </button>
        )}
        {success && (
          <div className="alert success-dailog">{successMessage}</div>
        )}
        {error && <div className="alert error-dailog">{error}</div>}
      </div>
    </div>
  );
};

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
