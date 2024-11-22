import React, { useState } from 'react'; // Removed useEffect import
import axios from 'axios';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Initialize as empty array to clear on refresh

  // Function to simulate receiving a message from support that includes the user's sent message
  const simulateReceiveMessage = (sentMessage) => {
    // Create a message where support repeats the user's message
    const supportMessage = {
      text: `Hello, your message is: "${sentMessage}"`,
      sender: 'support',
    };

    // Add the support reply message to the chat after a delay
    setMessages((prevMessages) => [...prevMessages, supportMessage]);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      // Add the user's message to the chat
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);

      // Optionally, send the message to your backend here
      try {
        const response = await axios.post('http://localhost:5001/send-message', {
          message,
        });
        console.log(response.data); // Handle response if necessary
      } catch (error) {
        console.error('Error sending message:', error);
      }

      // Simulate receiving a response from support immediately after sending
      setTimeout(() => simulateReceiveMessage(message), 1000); // Wait 1 second before showing the dummy support message

      // Clear the input field after sending the message
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header mb-3">Chat with Support</div>
      <div className="Msg-box">
        {messages.length === 0 ? (
          <p>No messages yet. Start the conversation!</p> // Display a message when no messages exist
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`Msg ${msg.sender === 'user' ? 'ms-auto bg-primary' : 'bg-dark'} text-white`}
            >
              <div className="Msg-txt">{msg.text}</div>
            </div>
          ))
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
