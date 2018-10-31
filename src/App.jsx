
import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';

function Navbar() {
  return (
    <nav className="navbar">
     <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  )
}

const currentUser = {
  "name": "Bob"
}

const oldMessages = {
  "messages": [
    {
      "id": 1,
      "type": "incomingMessage",
      "content": "I won't be impressed with technology until I can download food.",
      "username": "Anonymous1"
    },
    {
      "id": 2,
      "type": "incomingNotification",
      "content": "Anonymous1 changed their name to nomnom",
    },
    {
      "id": 3,
      "type": "incomingMessage",
      "content": "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
      "username": "Anonymous2"
    },
    {
      "id": 4,
      "type": "incomingMessage",
      "content": "...",
      "username": "nomnom"
    },
    {
      "id": 5,
      "type": "incomingMessage",
      "content": "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
      "username": "Anonymous2"
    },
    {
      "id": 6,
      "type": "incomingMessage",
      "content": "This isn't funny. You're not funny",
      "username": "nomnom"
    },
    {
      "id": 7,
      "type": "incomingNotification",
      "content": "Anonymous2 changed their name to NotFunny",
    }
  ]
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { loading: true,
      messageList: oldMessages.messages,
      currentUser: currentUser,
      messageContent: ''
    };
  }

  addNewMessage = ((inputValue, user) => {
    this.setState({messageContent: inputValue}, () => {
      const newMessage = [{
        id: (this.state.messageList.length + 1),
        type: "incomingMessage",
        username: this.state.currentUser.name,
        content: this.state.messageContent}];
      const messages = this.state.messageList.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messageList: messages})
      });
  });

  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      // const newMessage = [{
      //   id: (this.state.messageList.length + 1),
      //   type: "incomingMessage",
      //   username: "Michelle",
      //   content: this.state.messageContent}];
      // const messages = this.state.messageList.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messageList: messages, loading: false})
    // }, 3000);
    // console.log(messageList);
//   }
// }

  componentDidMount() {
    this.socket = new WebSocket(
      "ws://localhost:3001"
    );
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading: false}); // this triggers a re-render!
    }, 3000)
  }


  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <Navbar />
          <ChatBar currentUser={this.state.currentUser.name} addNewMessage={this.addNewMessage}/>
          <MessageList messages={this.state.messageList}/>
        </div>
      );
    }
  }
}

export default App;
