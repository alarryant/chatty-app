import React, {Component} from 'react';

class Chatbar extends React.Component {

  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
    this.enterChangeUser = this.enterChangeUser.bind(this);
  }

  // handles change for onEnter in message input field
  onEnter(event) {
    event.preventDefault();
    let input;
    if ((event.key === "Enter") && event.target.value) {
      input = event.target.value;
      this.props.addNewMessage(input);
      event.target.value = "";
    }
  }

  // handles change for onEnter in change user input field
  enterChangeUser(event) {
    event.preventDefault();
    let input;
    if ((event.key === "Enter") && (event.target.value !== this.props.currentUser)) {
      input = event.target.value;
      this.props.changeUser(input);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
               placeholder="Your Name (Optional)"
               defaultValue={ this.props.currentUser }
               onKeyUp={this.enterChangeUser} />
        <input className="chatbar-message"
               placeholder="Type a message and hit ENTER"
               onKeyUp={this.onEnter} />
      </footer>
    )
  }
}

export default Chatbar;