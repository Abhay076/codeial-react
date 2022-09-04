import React, { Component } from 'react';
import { PostList, FriendsList } from './';
import { connect } from 'react-redux';
// import { fetchFriends } from '../actions/friends';
class Home extends Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    console.log('isLoggedIn',isLoggedin);
    console.log('Props', this.props);
    return (
      <div className="home">
        <PostList posts={posts} />

       { isLoggedin && <FriendsList friends={friends} /> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(Home);




// export default Home;
