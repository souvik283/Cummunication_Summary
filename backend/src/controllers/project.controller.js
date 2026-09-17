import projectModel from "../models/project.model.js";

// Create a new project
export async function handleProjectCreation(req, res) {
  try {
    const { name, description, members, startDate, endDate } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const ownerId = req.user._id;

    const project = await projectModel.create({
      name: name.trim(),
      description: description?.trim() || "",
      owner: ownerId,

      members: [ownerId, ...(Array.isArray(members) ? members : [])],

      status: "active",

      startDate: startDate || Date.now(),
      endDate: endDate || null,
    });

    // Populate owner and members before sending response
    const populatedProject = await projectModel
      .findById(project._id)
      .populate("owner", "fullName email profileImg")
      .populate("members", "fullName email profileImg");

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: populatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
}

export async function handleAddMember(req, res) {
  try {
    const { projectId } = req.params;
    const { newMembers } = req.body;

    // Validate newMembers
    if (!Array.isArray(newMembers) || newMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one member",
      });
    }

    // Add members without creating duplicates
    const project = await projectModel
      .findByIdAndUpdate(
        projectId,
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
      .populate("owner", "fullName email profileImg")
      .populate("members", "fullName email profileImg");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Members added successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add members to this project",
      error: error.message,
    });
  }
}

export async function handleDeleteMember(req, res) {
  try {
    const { projectId } = req.params;
    const { deleteMembers } = req.body;

    // Validate newMembers
    if (!Array.isArray(deleteMembers) || deleteMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one member",
      });
    }

    const project = await projectModel
      .findByIdAndUpdate(
        projectId,
        {
          $pull: {
            members: {
              $in: deleteMembers,
            },
          },
        },
        {
          returnDocument: "after",
          runValidators: true,
        },
      )
      .populate("owner", "fullName email profileImg")
      .populate("members", "fullName email profileImg");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Members removed successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove members from this project",
      error: error.message,
    });
  }
}


export async function handleGetProjects(req, res) {
  try {
    const userId = req.user._id;

    const projects = await projectModel
      .find({
        $or: [
          { owner: userId },
          { members: userId }
        ]
      })
      .populate("owner", "fullName email profileImg")
      .populate("members", "fullName email profileImg")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get projects",
      error: error.message,
    })
  }
}

export async function handleGetProject(req, res) {
  try {
    const {projectId} = req.params
    const project = await projectModel
      .findById(projectId)
      .populate("owner", "fullName email profileImg")
      .populate("members", "fullName email profileImg")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      project
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get projects",
      error: error.message,
    })
  }
}