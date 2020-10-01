const express=require('express');
const bodyParser=require('body-parser');
const passport=require('passport');
const mongoose=require('mongoose');
const auth=require('./routes/auth');
const user=require('./routes/user');
var dot =require('dotenv');
dot.config();
const app=express();
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false});
mongoose.connection.on('connected', function(){
  console.log('connected');
});
app.use(bodyParser.json());
app.set('trust proxy', 1)
app.use(require('express-session')({
  secret:'hello',
  resave:false,
  saveUninitialized:false,
  cookie:{
    sameSite:"none",
    secure:true
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'https://warm-scrubland-49028.herokuapp.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.get('/',(req,res)=>{
  res.send('home');
})
app.use('/auth', auth);
app.use('/user',user);

app.listen(process.env.PORT || 3000,function(){
  console.log("running");
});