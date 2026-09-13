import messageModel from "../models/message.model.js";
import channelModel from "../models/channel.model.js";
import mongoose from "mongoose";

export async function handleSendMessage(req, res) {
  try {
    const { channelId } = req.params;
    const { text, replyTo } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message to send",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid channel ID",
      });
    }

    const channel = await channelModel.findById(channelId);

    if (!channel) {
      return res.status(402).json({
        success: false,
        message: "Channel not found",
      });
    }

    const sender = req.user._id;

    const newMessage = await messageModel.create({
      channel: channelId,
      sender,
      content: text.trim(),
      replyTo: replyTo || null,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      message: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send the message",
      error: error.message,
    });
  }
}

export async function handleGetMessage(req, res) {
  try {
    const { channelId } = req.params;

    const channel = await channelModel.findById(channelId);

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    const messages = await messageModel
      .find({ channel: channelId })
      .populate("sender", "name email avatar")
      .populate("replyTo")
      .sort({ createdAt: 1 });


      if (messages.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No messages yet",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get the messages",
      error: error.message,
    });
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         