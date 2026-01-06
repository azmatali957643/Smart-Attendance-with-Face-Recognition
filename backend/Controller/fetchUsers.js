
 const USER=require('../models/user');
exports.fetchUsers=async(req,res)=>{
        try {
    const users = await USER.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}