
import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

const URI = require('urijs');

// pulls URL out of message
function extractImageURL(input) {
  let result;
  URI.withinString(input, function(url) {
    result = url;
  });
  return result;
}


function Navbar(props) {
  return (
    <nav className="navbar">
     <a href="/" className="navbar-brand">Yip Yap</a>
     <p>{props.onlineUsers} {props.onlineUsers > 1 ? "users" : "user"} online</p>
    </nav>
  )
}

class MessagesEnd extends React.Component {
  // chat log automatically scrolls down when current view is full
  componentDidUpdate() {
    scrollToBottom();
  }

  render() {
    // dummy div placed after rendered messages that scroll function can target
    return (
      <div className="endOfMessages">
      </div>
    )
  }
}

//scroll function that targets div at end of rendered messages
function scrollToBottom() {
  const messagesEnd = document.getElementsByClassName("endOfMessages")[0];
  messagesEnd.scrollIntoView();
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {loading: true,
                  messageList: [],
                  currentUser: "Anonymous",
                  onlineUsers: ''};
  }
  // callback function to send new message to server
  addNewMessage = (inputValue => {
    // checks if message string contains an image URL
    if (inputValue.includes(".gif") || inputValue.includes(".png") || inputValue.includes(".jpg") || inputValue.includes(".jpeg")) {
      // extracts other parts of message string that are not URLs
      let newString = inputValue.replace(extractImageURL(inputValue), '');
      const newMessage = {type: "incomingPicMessage",
                          username: this.state.currentUser,
                          content: newString,
                          imgURL: extractImageURL(inputValue)};
    this.socket.send(JSON.stringify(newMessage));
    } else {
      //sends regular messages to server
      const newMessage = {type: "incomingMessage",
                          username: this.state.currentUser,
                          content: inputValue};
    this.socket.send(JSON.stringify(newMessage));
    }
  });

  // callback function to send username change to server
  changeUser = (inputValue => {
    let notification = {type: "incomingNotification",
                        content: `${this.state.currentUser} changed their name to ${inputValue}`,
                        currentUser: inputValue};
    this.setState({currentUser: inputValue})
    this.socket.send(JSON.stringify(notification));
  });

  componentDidMount() {
    // connects to Web Socket server
    this.socket = new WebSocket(
      "ws://localhost:3001"
    );

    // receives data from server
    this.socket.onmessage = (event) => {
      let parsedMessage = JSON.parse(event.data);
      // update number of users online
      if (parsedMessage.type === "usercounter") {
        this.setState({onlineUsers: parsedMessage.value});
      } else {
        // updates message list with new message
        const messages = this.state.messageList.concat(parsedMessage);
        this.setState({messageList: messages});
      }
    }

    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading: false});
    }, 3000)
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <Navbar onlineUsers={this.state.onlineUsers}/>
          <ChatBar currentUser={this.state.currentUser}
                   addNewMessage={this.addNewMessage}
                   changeUser={this.changeUser}/>
          <MessageList messages={this.state.messageList}/>
          <MessagesEnd />
        </div>
      );
    }
  }
}

export default App;
