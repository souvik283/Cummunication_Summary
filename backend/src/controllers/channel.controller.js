import channelModel from "../models/channel.model.js";
import projectModel from "../models/project.model.js";
import userModel from "../models/user.model.js";
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

export async function handleGetChannels(req, res) {
  try {
    const { projectId } = req.params;

    const channels = await channelModel
      .find({ project: projectId })
      .sort({ createdAt: 1 })
      .populate("createdBy", "fullName email profileImg")
      .populate("members", "fullName email profileImg");
    return res.status(200).json({
      success: true,
      channels,
    });
  } catch (error) {
    console.error("Get channels error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get channels",
      error: error.message,
    });
  }
}

export async function handleGetChannels2(req, res) {
  try {
    const { projectName } = req.params;
    const userId = req.user._id;
    const name = projectName.replace(/-/g, " ");
    //  console.log(name);

    const project = await projectModel
      .findOne({
        name,
      })
      .populate("owner", "fullName email profileImg")
      .populate("members", "fullName email profileImg");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // console.log(project._id);

    const channels = await channelModel
      .find({ project: project._id, members: userId })
      .sort({ createdAt: 1 })
      .populate("createdBy", "fullName email profileImg")
      .populate("members", "fullName email profileImg");
    return res.status(200).json({
      success: true,
      channels,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export async function handleGetNonChannelMember(req, res) {
  try {
    const { channelId } = req.params;
    const {projectId} = req.body;

    const project = await projectModel
      .findById(projectId)
      .select("members");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const channel = await channelModel
      .findById(channelId)
      .select("members project");

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    if (channel.project.toString() !== projectId) {
      return res.status(400).json({
        success: false,
        message: "Channel does not belong to this project",
      });
    }

    const channelMemberIds = channel.members;

    // Get project members who are NOT in the channel
    const users = await userModel
      .find({
        _id: {
          $in: project.members,
          $nin: channelMemberIds,
        },
      })
      .select("fullName email profileImg");

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error getting non-channel members:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}