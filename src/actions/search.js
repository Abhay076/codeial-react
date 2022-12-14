import { FETCH_SEARCH_RESULTS_SUCCESS } from './actionTypes';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { APIUrls } from '../helpers/urls';
export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIUrls.userSearch(searchText);
    fetch(url, {
      headers: {
        mode: 'no-cors',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('SEARCH DATA', data);
        if (data.success) {
          dispatch(searchResultsSuccess(data.data.users));
        } else {
          dispatch(searchResultsSuccess([]));
        }
      })
      .catch((err)=>{dispatch(searchResultsSuccess([]))})
  };
}

export function searchResultsSuccess(user) {
  console.log('uSers',user)
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    user,
  };
}
