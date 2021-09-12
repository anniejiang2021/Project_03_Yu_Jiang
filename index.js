const express = require("express")
const bcrypt = require('bcryptjs')
const app = express()
const data = require("./data.js")
// const db = require('./database')


const PORT = process.env.PORT || 3000


// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// SET MY TEMPLATING ENGINE AS EJS
app.set('view engine', 'ejs')
//  app.set('views', './samples') // set the views folder to a different name

// set the public folder as our static folder
app.use(express.static('public'))


// Homepage
app.get("/", (req, res) => {
res.render('pages/index')
})

// Displays all users

app.get("/users", (req, res) => {
res.render('pages/users', {
users: data.users
})
})

// Add a new user
app.get('/users/new', (req,res) => {
  console.log(data.users)
  res.render('pages/newuser',data.users)

})
app.post("/users/new", (req, res) => {
  const {id,firstname, lastname, email, password} = req.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
 const lastuserid =data.users[data.users.length - 1].id
  const newUser = {
  id:lastuserid + 1,
  firstname,
  lastname,
  email,
  password: hash,
    }
  data.users.push(newUser);
//  res.json(newUser) ;
 res.redirect('/users');


  // put it into database

  })
  
  // add a new schedule method1
  app.get('/posts/new', (req,res) => {
    console.log(data.users);
    res.render('pages/newpost', {users:data.users});
  })
  // app.post('/posts/new', (req, res) => {
  //   console.log(req.body);
  //   data.posts.push(req.body);
  //     res.redirect('/posts');
  //     });
    
  // add a new schedule method2
  app.post("/posts/new", (req, res) => {
    const {user_id,firstname,lastname, day, start_at, end_at} = req.body;
    // const lastuserid =data.users[data.users.length - 1].id
      //  const lastuserid =data.users.id
        // console.log(lastuserid)
        
    const newPost = {
    user_id,
    firstname,
    lastname,
        day,
    start_at,
    end_at,
    
    }
    data.posts.push(newPost);
    console.log(user_id);
  //  res.json(newUser) ;
   res.redirect('/posts');})

  // display all schedules
  app.get("/posts", (req, res) => {
    res.render('pages/posts', {
    posts: data.posts
    })
    })

    // display a single schedule

// app.get("/posts/:id", (req, res) => {
//   const found = data.posts.some(post => post.user_id === Number(req.params.id))
  
//   if (found) {
//   const post = data.posts.filter(post => post.user_id === Number(req.params.id))
//   res.send(post[0])
//   } else {
//   res.send("Post not found")
//   }
//   })
  
  // app.get('/posts', (req, res) => {
  // res.render('pages/posts', {
  // posts: data.posts
  // })
  // })



  // Display a single user
  app.get("/users/:id", (req, res) => {
    const users = data.users.filter((user) => {
      return user.id == req.params.id;

  })
  res.render('pages/userinf.ejs',{
    users:users,
    user:data.users[req.params.id]
  })

    
  })


  // display one special user's all schedules
  
    app.get("/users/:id/posts", (req, res) => {
    const userposts = data.posts.filter((post) => {
      return post.user_id === Number(req.params.id) ;

  })
  res.render('pages/userpost.ejs',{
  
   posts:userposts,
    user:data.users[req.params.id]
  })

    
})

    
    app.listen(PORT, () => {
    console.log(
    `App is listening at http://localhost:${PORT}`  )
  })