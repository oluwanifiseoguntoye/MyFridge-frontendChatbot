import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const messageInput = event.target.elements.message;
    const message = messageInput.value.trim();
    if (message !== '') {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
      messageInput.value = '';
      const messagesContainer = document.querySelector('.messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  return (
    <div className="App">
      <div className="chat-wrapper">
        <div className="chat-container">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-text">{message.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleMessageSubmit} className="input-container">
            <input type="text" name="message" placeholder="Type a message..." autoComplete="off" />
            <button type="submit"><i className="fa fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
