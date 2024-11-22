const express = require('express');
const router = express.Router();
const Message = require('./models/message'); // Assuming you have a message model
const User = require('./models/user'); // Assuming you have a user model

// Send message route
router.post('/send-message', async (req, res) => {
  const { senderId, receiverId, messageContent } = req.body;

  try {
    // Validate user existence
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(400).json({ message: 'Invalid sender or receiver' });
    }

    // Create new message
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content: messageContent,
    });

    await newMessage.save();
    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

module.exports = router;
