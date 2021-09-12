const express = require("express")
const bcrypt = require('bcryptjs')
const app = express()
// const data = require("./data")
const db = require('./database')

const path = require('path')

const PORT = process.env.PORT || 3000


// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// SET MY TEMPLATING ENGINE AS EJS
app.set('view engine', 'ejs')
//  app.set('views', './samples') // set the views folder to a different name

// set the public folder as our static folder
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

// Homepage
app.get("/", (req, res) => {
res.render('pages/index')
})

// Displays all users

// app.get("/users", (req, res) => {
// res.render('pages/users', {
// users: data.users
// })
// })

// Add a new user
// app.get('/users/new', (req,res) => {
//   console.log(data.users)
//   res.render('pages/newuser',data.users)
// })

// app.post("/users/new", (req, res) => {
//   const {firstname, lastname, email, password} = req.body
//   const salt = bcrypt.genSaltSync(10)
//   const hash = bcrypt.hashSync(password, salt)
//  const lastuserid =data.users[data.users.length - 1].id
//   const newUser = {
//   firstname,
//   lastname,
//   email,
//   password: hash,
//   id:lastuserid + 1
//   }
//   data.users.push(newUser);
//  // put it into database
//  // select * from db.users ???? should use it or not; how get new user inf to database?
// db.none(
//             'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);',
//              [req.body.firstname, req.body.lastname, req.body.email, req.body.password]
//         )
//         .then(() => {
//             res.redirect('/users');
//         })
//         .catch((error) => {
//             console.log(error);
//             res.send(error);
//         })
//       //  res.redirect('/users'); 
//     })
   
  
    
     
  // add a new schedule
  app.get('/posts/new', (req,res) => {
  
    res.render('pages/newpost');
  })
  app.post('/posts/new', (req, res) => {
    console.log(req.body);
    // res.send(req.body)
  //   data.posts.push(req.body);
  
  //   // res.send(req.body)
  //   // put into database
  //    // select * from db.posts ???? should use it or not
    db.none(
      'INSERT INTO schedules (username, day, start_at, end_at) VALUES ($1, $2, $3, $4);',
       [req.body.username, req.body.day, req.body.start_at, req.body.end_at]
  )
  .then(() => {
      res.redirect('/posts');
  })
  .catch((error) => console.log(error));
})


    
  
    // display all schedules 
  
  app.get("/posts", (req, res) => {
    db.any('SELECT * FROM schedules')
    .then(function(data) {
        // success;
        console.log(data)
        // res.send(data)
        res.render('pages/posts', 
    {      posts: data   }
    )
    })
    .catch(function(error) {
        // error;
    });


    
    })



  // Display a single user
  // app.get("/users/:id", (req, res) => {
  //   const users = users.filter((user) => {
  //     return user.id == req.params.id;

  // })
  // res.render('pages/userinf.ejs',{
  //   users:users,
  //   user:data.users[req.params.id]
  // })

    
  // })


  // display one special user's all schedules
  // app.get("/posts/:id", (req, res) => {
  //   app.get("/users/:id/posts", (req, res) => {
  //   const posts = data.posts.filter((post) => {
  //     return post.user_id == req.params.id;

  // })
  // res.render('pages/userpost.ejs',{
  //   posts:posts,
  //   user:data.users[req.params.id]
  // })

    
  // })

    
    app.listen(PORT, () => {
    console.log(
    `App is listening at http://localhost:${PORT}`
    )})

    