import React, {Component} from 'react';

function NewMessages(props) {
  // sets colour of each message's sender
  const colourStyle = {color: props.indivMessage.color};

  if (props.indivMessage.type === "incomingMessage" || props.indivMessage.type === "incomingPicMessage") {
    return (
      <div className="message">
        <span className="message-username" style={colourStyle}>{props.indivMessage.username}</span>
        <span className="message-content">{props.indivMessage.content}{props.indivMessage.type === "incomingPicMessage" ? (<br/>) : ''}
          {props.indivMessage.type === "incomingPicMessage" ? (<img src={props.indivMessage.imgURL}/>) : ''}
        </span>
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
