import React, { useState, useRef, useEffect } from 'react';
import './App.css';



function App() {
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const messageInput = event.target.elements.message;
    const message = messageInput.value.trim();
    if (message !== '') {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
      messageInput.value = '';

      // Send user's message to the RecipeBot view
      fetch('http://127.0.0.1:8000/recipesapi/recipebot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add RecipeBot's response to messages state
          setMessages((prevMessages) => [...prevMessages, { text: data.message, sender: 'bot' }]);
        })
        .catch((error) => console.error(error));
    }
  };

  const [initialMessageSent, setInitialMessageSent] = useState(false);

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer.scrollHeight > messagesContainer.clientHeight) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages.length]);
  
  
  useState(() => {
    console.log('useEffect ran');
  
    if (!initialMessageSent) {
      setInitialMessageSent(true);
      setMessages((prevMessages) => [...prevMessages, { text: "Hi! What ingredients would you like to use?", sender: 'bot' }]);
    }
  }, [setMessages]);
  
  return (
    <div className="App">
      <div className="chat-wrapper">
        <div className="chat-container">
          <div className="messages" ref={messagesContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <span className={`icon ${message.sender === 'user' ? 'user-icon' : 'bot-icon'}`}>
                  <i className={`fas ${message.sender === 'user' ? 'fa-user' : 'fa-robot'}`}></i>
                </span>
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
