const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const localStrategy=require('passport-local').Strategy;
const UserServices=require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserServices.User.findById(id,function(err,user){
      done(err,user)
  });
});

passport.use(new GoogleStrategy({
    clientID: '766284901009-addbg5mgubtrnv5doie939saihjsr530.apps.googleusercontent.com',
    clientSecret: 'LhNiJw8ZqbyWw64-Fzkdyt1i',
    callbackURL: 'https://rocky-temple-08906.herokuapp.com/auth/google/redirect'
  },
   function (accessToken, refreshToken, profile, done){
    UserServices.findOrCreate(UserServices.User,done,profile);
   }
));

passport.use(new GitHubStrategy({
    clientID: '0ff9f174008c98f84fc6',
    clientSecret: '3a059e3bd45cc324f11f0555de0a874bcfdb45e3',
    callbackURL: 'https://rocky-temple-08906.herokuapp.com/auth/github/redirect'
  },
  function(accessToken, refreshToken, profile, done) {
    UserServices.findOrCreate(UserServices.User,done,profile);
  }
));

passport.use(new FacebookStrategy({
  clientID: '2599125657002783',
  clientSecret: 'bb2ff8ece7f15a10f5d1cedce0d20e20',
  callbackURL: "https://rocky-temple-08906.herokuapp.com/auth/facebook/redirect"
},
function(accessToken, refreshToken, profile, done) {
     UserServices.findOrCreate(UserServices.User,done,profile);
}
));

passport.use(new localStrategy((username,password,done)=>{
  UserServices.User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
       return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password!==password) {
       return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
}))
