import messageModel from "../models/message.model.js";
import { generateSummary } from "../service/ollamaService.js";
import summaryModel from "../models/summary.js";


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

    const content = await generateSummary(messages);

   const summary = await summaryModel.create({
      channel: channelId,
      summary: content,
      
    });

    return res.status(201).json({
      success: true,
      message: "Summary saved successfully",
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



export const getLatestSummary = async (req, res) => {
  try {
    const { channelId } = req.params;

    if (!channelId) {
      return res.status(400).json({
        success: false,
        message: "Channel ID is required",
      });
    }

    const summary = await summaryModel.findOne({
      channel: channelId,
    })
      .sort({ createdAt: -1 })
      .populate("channel", "name")

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: "No summary found for this channel",
      });
    }

    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Get latest summary error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get latest summary",
    });
  }
};