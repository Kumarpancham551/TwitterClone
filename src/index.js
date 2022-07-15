require("dotenv").config();
const express = require("express");
const path = require('path');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const tweetRoutes = require('./routes/tweet');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')
const methodOverride = require('method-override');

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(passport.initialize())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());



// sample for express server
app.use('/tweet', tweetRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use("/", (req, res, next) => {
  res.status(200).json({ success: true, data: "Welcome to twitter, hey twiteratis" });
});

const mongoose = require('mongoose');
const URL = process.env.DB_URL||'mongodb://127.0.0.1/Twitter';
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'MongoDB connection error:'));
db.once("open", () => {
    console.log("Database connected");
})

const PORT = process.env.PORT || 3000; // port at which server listening

app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

