const express=require("express");
const router=express.Router();
const db=require("../db");
router.post("/",(req,res)=>{const{ idUsuario,idServico,dataAgendamento }=req.body;db.query("INSERT INTO Agendamento(idUsuario,idServico,dataAgendamento) VALUES(?,?,?)",[idUsuario,idServico,dataAgendamento],(e)=>e?res.status(500).send(e):res.send({ok:true}));});
module.exports=router;