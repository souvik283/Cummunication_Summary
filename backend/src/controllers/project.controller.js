import projectModel from "../models/project.model";

// Create a new project
export async function handleProjectCreation(req, res) {
    
  try {
    const { name, description, members, startDate, endDate } = req.body;

    // Validate project name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const ownerId = req.user.id;

    const project = await projectModel.create({
      name: name.trim(),
      description: description?.trim() || "",
      owner: ownerId,

      members: [
        ownerId,
        ...(Array.isArray(members) ? members : []),
      ],

      status: "active",

      startDate: startDate || Date.now(),
      endDate: endDate || null,
    });

    // Populate owner and members before sending response
    const populatedProject = await projectModel.findById(project._id)
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
};

export async function handleAddMember(req, res) {
    try {
        const projectId= 435;
        const {newMembers} = req.body
       
        const project = await  projectModel.findByIdAndUpdate(projectId, {
            members: [
                members, 
                ...(Array.isArray(newMembers) ? newMembers : []),
            ]
        })
        
    } catch (error) {
        return res.status(500).json({
      success: false,
      message: "Failed to add employee on this project",
      error: error.message,
    });
    }
}