import React, { Component } from 'react';
import propTypes from 'prop-types';
class PostList extends Component {
    render() {
        const {posts} = this.props;
        return (
            <div className="posts-list">
            {posts.map((post) => (
              <div className="post-wrapper" key={post._id}>
                <div className="post-header">
                  <div className="post-avatar">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                      alt="user-pic"
                    />
                    <div>
                      <span className="post-author">{post.user.name}</span>
                      <span className="post-time">a minute ago</span>
                    </div>
                  </div>
                  <div className="post-content"> {post.content}</div>
                  <div className="post-actions">
                    <div className="post-like">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
                        alt="likes-icons"
                      />
                      <span>{post.likes.length}</span>
                    </div>
                    <div className="post-comments-icon">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                        alt="comments-icons"
                      />
                      <span className="">{post.comments.length}</span>
                    </div>
                  </div>
                  <div className="post-comment-box">
                    <input placeholder="start typing a comment" />
                  </div>
                  <div className="post-comments-list">
                    <div className="post-comments-item">
                      <div className="post-comment-header">
                        <span className="post-comment-author">Bill</span>
                        <span className="post-comment-time">a minute ago</span>
                        <span className="post-comment-likes">22</span>
                      </div>
                      <div className="post-comment-content">Random Comment</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
}

PostList.propTypes = {
    posts: propTypes.array.isRequired,
};

export default PostList;