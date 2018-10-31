import React, {Component} from 'react';

function NewMessages(props) {
  if (props.indivMessage.type === "incomingMessage") {
    return (
      <div className="message">
        <span className="message-username">{props.indivMessage.username}</span>
        <span className="message-content">{props.indivMessage.content}</span>
      </div>
    )
  } else {
    return (
    <div className="message system">
      {props.indivMessage.content}
    </div>
    )
  }
}

export default NewMessages;
