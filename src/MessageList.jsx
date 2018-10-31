import React, {Component} from 'react';
import NewMessages from './Message.jsx';

function MessageList (props) {
  const listMessages = props.messages.map(message => (
    <NewMessages indivMessage={message} key={message.id}/>
  ))

  return (
    <main className="messages">
      {listMessages}
    </main>
  )
}

export default MessageList;
