 const USER=require('../models/user');
exports.deleted=async(req,res)=>{
    try {
    const { idCardNumber } = req.body; 
    console.log("id")
    console.log(idCardNumber)
    if (!idCardNumber) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const deletedUser =await USER.findOneAndDelete({ idCardNumber: idCardNumber });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser.firstName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
