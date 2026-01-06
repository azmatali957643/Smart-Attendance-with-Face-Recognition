const express = require("express");

const router = express.Router();

    const{signUp}=require('../Controller/userController')
    router.post("/signUp",signUp);

    const{deleted}=require('../Controller/deleteUser')
    router.delete("/delete",deleted);

     const{fetchUsers}=require('../Controller/fetchUsers')
    router.get("/users",fetchUsers);


module.exports=router;

