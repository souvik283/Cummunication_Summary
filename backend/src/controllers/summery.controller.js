import messageModel from "../models/message.model.js";
import { generateSummary } from "../service/ollamaService.js";

export async function handleGenerateChannelSummary(req, res) {
  try {
    const { channelId } = req.params;

    const messages = await messageModel
      .find({ channel: channelId })
      .populate("sender", "fullName email profileImg")
      .sort({ createdAt: 1 });

    if (!messages || messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No messages found",
      });
    }

    const summary = await generateSummary(messages);

    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Summary controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate summary",
      error: error.message,
    });
  }
}