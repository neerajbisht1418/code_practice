const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  productId : {type : String, require: true},
  timestamp:{type : String, require:true, default : new Date()}
},{ timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
