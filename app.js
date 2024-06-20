const express = require('express')
const app = express()

const port = 3001

//use different middleware
app.use(express.json())



//create  first route


let users = [{ name: 'Harry Potter and the Order of the Phoenix', id: 1, summary: 'Harry Potter and Dumbledores warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledores authority at Hogwarts and discredit Harry.', image: 'https://lh3.googleusercontent.com/OGQkzkYdfhAXE6p-xufS_6mB3MtjDfPM6HZPdDrX5uJ09Dh1vzLZ6YflPIduh2Jk-h7H'},  {name:'The Lord of the Rings: The Fellowship of the Ring', id: 2, summary: 'A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.', image:'https://upload.wikimedia.org/wikipedia/en/9/9d/Lord_of_the_Rings_-_The_Return_of_the_King.jpg'},  {name:'Avengers: Endgame', id: 3, summary: 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America, and Bruce Banner must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.', image: 'https://t2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9' }]



//all users get
app.get('/users', (req, res) => {
    res.send(users)
})

//get only one user 
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.filter(u => u.id === id)[0]
    if (user) {
        res.send(user)
    } else {
        res.status(404).send({error:"User does not exist"})
    }
})

//add a new user
app.post('/users', (req, res) => {
    console.log("req.body", req.body)

    //generate  new id 
    const id=users.length + 1

    //payload for posting new user
    const payload = {
        ...req.body,
        id:id 
    }
    users.push(payload)
  
    res.send("payload")
})

    //update information for a user
    app.put('/users/:id', (req, res) => {
      const id = parseInt(req.params.id)

      //index of that user in users array
      const index = users.findIndex(u => u.id === id)
      if(index<0) {
        res.status(404).send({error:"user does not exist"})
      }

      const name = req.body.name

      users[index].name = name

       res.send(users[index])
    })

    //delete user
    app.delete('/user/:id', (req, res) => {
        const id = parseInt (req.params.id)

    //index of that user in users array
     const index = users.findIndex(u => u.id === Id)

      if(index<0) {
        res.status(404).send({error: "user does not exist"})
      }
       users=users.filter(u=>u.id!==id)

       res.status(200).send("User deletetd")

    })


app.listen(port, () => {
    console.log("app is running in port:", port)
})










