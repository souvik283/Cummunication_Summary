import channelModel from "../models/channel.model.js";
import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export async function handleCreateChannel(req, res) {
  try {
    const { name, members, isPrivate } = req.body;
    const { projectId } = req.params;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }
    const createdBy = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(404).json({
        success: false,
        message: "Invalid Project",
      });
    }

    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    const newChannel = await channelModel.create({
      name: name.trim(),
      members: [createdBy, ...(Array.isArray(members) ? members : [])],
      project: projectId,
      createdBy,
      isPrivate,
    });

    return res.status(201).json({
      success: true,
      message: "Channel created successfully",
      project: newChannel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create channel",
      error: error.message,
    });
  }
}

export async function handleDeleteChannel(req, res) {
  try {
    const { channelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(404).json({
        success: false,
        message: "Invalid Channel",
      });
    }

    const isDeleted = await channelModel.findByIdAndDelete(channelId);
    if (!isDeleted) {
      return res.status(404).json({
        success: true,
        message: "Unable to found channel",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Channel deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete channel",
      error: error.message,
    });
  }
}

export async function handleAddMemberToChannel(req, res) {
  try {
    const { channelId } = req.params;
    const { newMembers } = req.body;

    if (!Array.isArray(newMembers) || newMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one member",
      });
    }

    const channel = await channelModel
      .findByIdAndUpdate(
        channelId,
        {
          $addToSet: {
            members: {
              $each: newMembers,
            },
          },
        },
        {
          returnDocument: "after",
          runValidators: true,
        },
      )
      .populate("createdBy", "fullName email profileImg")
      .populate("members", "fullName email profileImg");

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Members added successfully",
      channel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add members to this channel",
      error: error.message,
    });
  }
}

export async function handleRemoveMemberFromChannel(req, res) {
  try {
    const { channelId } = req.params;
    const { removeMembers } = req.body;

    // Validate newMembers
    if (!Array.isArray(removeMembers) || removeMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one member",
      });
    }

    const channel = await channelModel
      .findByIdAndUpdate(
        channelId,
        {
          $pull: {
            members: {
              $in: removeMembers,
            },
          },
        },
        {
          returnDocument: "after",
          runValidators: true,
        },
      )
      .populate("createdBy", "fullName email profileImg")
      .populate("members", "fullName email profileImg");

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "channel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Members removed successfully",
      channel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove members from this channel",
      error: error.message,
    });
  }
}
