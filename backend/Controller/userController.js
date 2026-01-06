 const USER=require('../models/user');
 exports.signUp=async(req,res)=>{
    try {
        const{firstName, lastName, idCardNumber, email,phoneNumber, course, role,photo}=req.body;

         //existingUser check
        const checkUser=await USER.findOne({idCardNumber})
        if(checkUser){
          return res.status(400).json({
                    success:false,
                    message: "user already register with same ID"
                })
        }
         
            // create entry 
        const response= await USER.create({firstName, lastName, idCardNumber, email,phoneNumber, course, role,photo})
        res.status(200).json({
            success:true,
            data:response,
            message: "user entry created"
        })


    } catch (error) {
         console.error(error);
    return res.status(500).json({
        success:false,
         message: " error while create entry "
    })
    }
 }

