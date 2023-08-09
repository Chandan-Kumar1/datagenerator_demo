require('dotenv').config()
const http = require("http");

const fs = require('fs');

const express = require('express');
const app = express();
//const PORT = 8000;

// const PORT =process.env.PORT || 8000;
const PORT =process.env.PORT;


const users = require('./MOCK_DATA.json');

console.log("my name is ", process.env.PORT);

// middleware
app.use(express.urlencoded({extended:false}));

app.get('/api/users', (req, res ) =>{
   // console.log(req.headers);
    // console.log(req.method)
    return res.json(users);
});

app.get('/api/users/:id', (req, res ) =>{

    const id =Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

// with route

// app.route('/api/users/:id')
//     .get((req, res)=>{
//         const id =Number(req.params.id);
//         const user = users.find((user) => user.id === id);
//
//         return res.json(user);
//     })
//     .patch((req, res)=>{
//     return res.json({status: 'pending'});
//      })
//     .delete((req, res)=>{
//         return res.json({status: 'pending'});
//     })


app.post('/api/users', (req, res ) =>{

    const body = req.body;
    console.log('Body', body);
    users.push({...body, id:users.length+1});

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
      return res.json({status: 'success', id:users.length});
  })
    console.log(res.json)
    //return res.json({status: 'pending'});
});

app.patch('/api/users/:id', (req, res) =>{
    return res.json({status: 'pending'});
})

app.delete('/api/users/:id', (req, res) =>{
    return res.json({status: 'Success'});
})

app.listen(PORT, () => console.log('Server Started'));