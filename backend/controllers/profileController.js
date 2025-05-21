const User = require("../models/User");

// GET profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Cannot fetch profile" });
  }
};

// UPDATE profile
exports.updateProfile = async (req, res) => {
  const { name, location, experience, skills, preferredJobType } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, location, experience, skills, preferredJobType },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Profile update failed" });
  }
};
