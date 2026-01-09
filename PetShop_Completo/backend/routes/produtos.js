const express=require("express");
const router=express.Router();
const db=require("../db");
router.get("/",(req,res)=>{db.query("SELECT * FROM Produto WHERE estoque>0",(e,r)=>e?res.status(500).send(e):res.send(r));});
module.exports=router;