import express from "express";
import session from "express-session";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

// 1. Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// 2. Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// 3. Configure Passport GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile); // You could save this user to DB
    }
  )
);

// 4. Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// 5. Routes

// Redirect to GitHub
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub Callback
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful login
    res.redirect("/profile");
  }
);

// Protected route
app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/auth/github");
  res.send(
    `<h1>Welcome, ${req.user.username}</h1><a href="/logout">Logout</a>`
  );
});

// Logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// Home
app.get("/", (req, res) => {
  res.send(`<a href="/auth/github">Login with GitHub</a>`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
