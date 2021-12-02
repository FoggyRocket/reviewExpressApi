require("dotenv").config(); //<= utiliza .env

const express = require("express");
const hbs = require('hbs');
const axios = require("axios")
// utlizamos express 
const app = express();

//config hbs partials public
app.set("view engine", "hbs");
app.set("views",__dirname + "/views");
app.use(express.static("public"));
//config partials
hbs.registerPartials(__dirname + "/views/partials")

//routes
//GET POST PUT DELETE <= Verbs

//Our routes go here:
/**
 *  example:
 *  app.get("/perrtios",(req,res,next)=>{})
 */

app.get("/", async (req,res,next)=>{
    try{
        //destructurando y reasignando
        // let data = res.data
        const {data} = await axios.get("https://rickandmortyapi.com/api/character")
       
        res.render("home",{characters:data.results})

    }catch(error){
        console.log("error",error)
        res.send("Error")
        // const search = error.message
        // window.open(`https://stackoverflow.com/search?q=${search}`, '_blank')
    }
})

app.get("/single-character/:idCharacter", async (req,res,next)=>{
    try{
        const { idCharacter } = req.params
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${idCharacter}`)
        console.log("EL ID",data)
        res.render("single",{character:{...data , single:true } })
    }catch(error){
        console.log("error",error)
        res.send("Error")
    }
})


//Levantar el server
app.listen(process.env.PORT,()=>{
    console.log("El server esta corriendo")
})