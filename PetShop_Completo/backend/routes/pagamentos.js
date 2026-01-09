const express=require("express");
const router=express.Router();
const db=require("../db");
router.post("/",(req,res)=>{const{ idCompra,metodo,valor }=req.body;db.query("INSERT INTO Pagamento(idCompra,metodo,valor) VALUES(?,?,?)",[idCompra,metodo,valor],(e)=>e?res.status(500).send(e):res.send({ok:true}));});
module.exports=router;