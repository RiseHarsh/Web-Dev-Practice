require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

// Dummy admin login
const adminUser = { email: "admin@example.com", password: "password123" };

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email === adminUser.email && password === adminUser.password) {
        req.session.admin = true;
        return res.json({ success: true });
    }
    res.json({ success: false, message: "Invalid Credentials" });
});

// Protect admin panel
app.get("/admin", (req, res) => {
    if (!req.session.admin) {
        return res.redirect("/login.html");
    }
    res.sendFile(__dirname + "/dashboard.html");
});

// Logout route
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login.html");
});

// Dynamic URL Masking
app.get("/dashboard", (req, res) => {
    if (!req.session.admin) return res.redirect("/login.html");
    res.redirect("/dashboard.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
