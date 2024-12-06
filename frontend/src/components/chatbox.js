import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Initialize as empty array to clear on refresh
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(''); // Added error state

  // Function to simulate receiving a message from support that includes the user's sent message
  const simulateReceiveMessage = (sentMessage) => {
    // Create a message where support repeats the user's message
    const supportMessage = {
      message: `Hello, your message is: "${sentMessage}"`, // Changed 'text' to 'message' for consistency
      sender: 'support',
    };

    // Add the support reply message to the chat after a delay
    setMessages((prevMessages) => [...prevMessages, supportMessage]);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      // Add the user's message to the chat
      setMessages((prevMessages) => [...prevMessages, { message, sender: 'user' }]);

      // Set loading state to true while the message is being sent
      setLoading(true);
      setError(''); // Reset error message

      // Optionally, send the message to your backend here
      try {
        const response = await axios.post('http://localhost:5001/send-message', {
          message,
        });
        console.log(response.data); // Handle response if necessary
      } catch (error) {
        setError('Error sending message'); // Update error state if there is an issue
        console.error('Error sending message:', error);
      }

      // Simulate receiving a response from support immediately after sending
      setTimeout(() => simulateReceiveMessage(message), 1000); // Wait 1 second before showing the dummy support message

      // Clear the input field after sending the message
      setMessage('');
      setLoading(false); // Set loading state to false after the message is sent
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header mb-3">Chat with Support</div>

      {/* Messages Section */}
      <div className="Msg-box" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {messages.length === 0 ? (
          <p>No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`Msg ${msg.sender === 'user' ? 'ms-auto bg-primary' : 'bg-dark'} text-white`}
            >
              <div className="Msg-txt">{msg.message}</div>
            </div>
          ))
        )}
      </div>

      {/* Error or Loading State */}
      {loading && <p>Sending message...</p>}
      {error && <div className="error text-danger">{error}</div>}

      {/* Input Section */}
      <div className="chat-input">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update message on input
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
