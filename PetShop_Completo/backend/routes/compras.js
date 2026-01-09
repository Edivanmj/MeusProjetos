const express=require("express");
const router=express.Router();
const db=require("../db");
router.post("/",(req,res)=>{const{ idUsuario,status }=req.body;db.query("INSERT INTO Compra(idUsuario,status) VALUES(?,?)",[idUsuario,status],(e,r)=>e?res.status(500).send(e):res.send({id:r.insertId}));});
module.exports=router;