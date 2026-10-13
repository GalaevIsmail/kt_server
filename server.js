const express = require("express")
const mongoose = require("mongoose")

const Computer = require("./models/Computer")


const PORT = 3000;


const app = express()
app.use(express.json())



mongoose.connect("mongodb://localhost:27017/computer").then(() =>{
    console.log("Успешно подключен к БД");
    
}).catch((error)=>{
    console.error("Ошибка при подключении товара"+ error);
    
})
   

app.get("/computer", async (req , res)=>{
    try{
        const computer = await Computer.find()
        res.json(computer)
    }catch(error){
        res.send("Ошибка при получении товара" + error)
    }
})


app.post("/computer" , async (req , res)=>{
    const {name ,  title, description ,  price} =req.body
    try{
        const newComputer = await Computer.create({
            name ,  title, description ,  price
        })
        await newComputer.save()
        res.send("Товар добален успешно")
    }catch(error){
        console.log("Ошибка при добалении товара:" + error);
        res.send("Ошибка при добавлении товара")
    }
})


app.put("/computer/:id", async (req, res) =>{
    try{
        const{id} =req.params
        const {name ,  title, description ,  price}= req.body
        console.log(id);
        

        const updeteComputer = await Computer.findByIdAndUpdate(id ,{
            name ,  title, description ,  price
        }, {new:true})
        if(!updeteComputer){
            res.send("Такого товара не существует")
        }
        res. json(updeteComputer , "Товар обновлен успешно")
    }catch(error){
        console.log("Ошибка при обновлении товра"+ error);
        
    }
})

app.patch("/computer", async (req , res) =>{
    try{
        const {id}= req.params
        const updeteComputer = await Computer.findByIdAndUpdate(id, {$set: req.body} , {new: true})
        if(!updeteComputer){
            res.send("Токого товара нету")
        }
         res.json(updeteComputer)
    }catch(error){
        res.send("Ошибка при измении товара")
    }
})


app.delete("/computer/:id", async (req, res) =>{
    try{
        const {id} = req.params
        const computer = await Computer.findByIdAndDelete(id)
        if (!computer){
            res.send("Такого товара не существует ")
        }
        res.send("Товар удален супешно")
    }catch(error){
        res.send("Ошибка при удалении товара" + error)
    }
})

app.listen(PORT , ()=>{
    console.log("Успешно подключен порт:" + PORT);
    
})