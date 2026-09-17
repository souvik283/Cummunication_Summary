import mongoose from "mongoose";

const summarySchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },

    summary: {
      type: String,
      required: true,
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

const summaryModel = mongoose.model("Summary", summarySchema);

export default summaryModel