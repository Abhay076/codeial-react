import React, { Component } from 'react';
import '../chat.css';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [], //{content:'some messages',self:true}
      typedMessage: '',
    };
  }
  render() {
    const { typedMessage, messages } = this.state;
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://img.icons8.com/windows/344/minus-math.png"
            alt=""
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messages?.map((message) => (
            <div
              className={
                messages.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Chat;
