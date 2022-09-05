import {
  ADD_POST,
  UPDATE_POSTS,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  REMOVE_POST_LIKE,
} from '../actions/actionTypes';

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPosts;
    case UPDATE_POST_LIKE:
      const updatedPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return updatedPosts;
    case REMOVE_POST_LIKE:
      const removePosts = state.map((post) => {
        if (post._id === action.postId) {
          const updatedLike = post.likes;
          const index = updatedLike.indexOf(action.userId);
          updatedLike.splice(index, 1);
          return {
            ...post,
            // likes: [...post.likes, action.userId],
            likes: [...updatedLike],
          };
        }
        return post;
      });
      return removePosts;
    default:
      return state;
  }
}
