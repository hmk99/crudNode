const express= require("express")
const app= express()
const mysql= require("mysql")
const cors= require("cors")

app.use(cors())
app.use(express.json())

const db= mysql.createConnection({
    user: 'hmk',
    host: 'localhost',
    password: '1234',
    database: 'test'
});

app.post("/create", (req,res)=> {
    const todo= req.body.todo;
    db.query("INSERT INTO todo (todo) VALUES (?)",
    [todo],
    (err, result)=> {
        if (err){
            console.log(err)
        }else{
            res.send("values inserted")
        }
    }
    )
})


app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM todo WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.get("/todo", (req,res)=>{
    db.query("SELECT * FROM todo",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result)
        }
    })
})
app.get("/doc/:id", (req,res)=>{
    const id= req.params.id;
    db.query("SELECT * FROM doctor where id=?", id, (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result)
        }
    })
})
app.get("/doc", (req,res)=>{
    db.query("SELECT * FROM doctor",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result)
        }
    })
})

app.put("/update", (req, res) => {
    const id = req.body.id;
    const todo = req.body.todo;
    db.query(
      "UPDATE todo SET todo= ? WHERE id = ?",
      [todo, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });


app.listen(3030,()=>{
    console.log('djdk')
})