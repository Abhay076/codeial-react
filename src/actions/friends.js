import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { FETCH_FRIENDS_SUCCESS, ADD_FRIEND } from './actionTypes';
import { APIUrls } from '../helpers/urls';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data_friends', data.data.friends);
        dispatch(fetchFriendsSuccess(data.data.friends));
      });
  };
}

export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}
