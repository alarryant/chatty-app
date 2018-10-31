import React, {Component} from 'react';




class Chatbar extends React.Component {

  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
  }

  onEnter(event) {
    event.preventDefault();
    let input;
    if ((event.key === "Enter") && event.target.value) {
      input = event.target.value;
      this.props.addNewMessage(input);
      event.target.value = "";
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={ this.props.currentUser }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.onEnter}/>
      </footer>
    )
  }
}

export default Chatbar;