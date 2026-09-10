const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    keyPoints: [
      {
        type: String,
      },
    ],

    decisions: [
      {
        type: String,
      },
    ],

    actionItems: [
      {
        type: String,
      },
    ],

    messageCount: {
      type: Number,
      default: 0,
    },

    generatedBy: {
      type: String,
      default: "ollama",
    },

    model: {
      type: String,
      default: "gemma3",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Summary", summarySchema);