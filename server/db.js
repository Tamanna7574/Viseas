var express = require("express");
var app = express();
var cors= require("cors");
const multer=require("multer");
const path=require("path");
app.use(express.json());
app.use(cors());
var mysql =require("mysql");
var nodemailer = require("nodemailer");
app.use("/public",express.static("public"));
var con=mysql.createConnection(
  {
    host:"localhost",
    user:"root",
    password:"",
    database:"viseas"
  }
);


con.connect((err) => {
  if (err) {
    console.log("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});


const storage = multer.diskStorage({
  destination: path.join(__dirname, './public/'),
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  }
});


app.post("/api/insert", (req, res) => {
  const { name, email, password, mobile } = req.body;
  const checkQuery = "SELECT * FROM register_detail WHERE email = ?";
  con.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.error("Check Error:", err);
      return res.status(500).json({ msg: "Server error during email check" });
    }

    if (result.length > 0) {
      return res.status(401).json({ msg: "Email already exists" });
    } else {

      const insertQuery = "INSERT INTO register_detail(name, email, mobile, password) VALUES (?, ?, ?, ?)";
      con.query(insertQuery, [name, email, mobile, password], (err, result) => {
        if (err) {
          console.error("Insert Error:", err);
          return res.status(500).json({ msg: "Registration failed" });
        }
        return res.status(200).json({ msg: "success" });
      });
    }
  });
});

app.post("/api/emailcheck", (req, res) => {
  var email = req.body.email;

  const query = "SELECT * FROM register_detail WHERE email = ?";
  con.query(query, [email], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length > 0) {
      console.log("same email");
      return res.status(401).json({
        message: "Email Already Exist",
      });
    } else {
      return res.status(200).json({ message: "ok" });
    }
  });
});

app.post("/api/verify" ,(req,resp) =>{
  var eemail=req.body.email;
  var pass=req.body.password;
  const query="Select * from register_detail where email=? and password=?";
  con.query(query,[eemail,pass],(err,result)=>{
    if(result.length > 0)
    {
      resp.send(result);
    }
    else{
      resp.send({msg:"Wrong email id or password"});
    }
  });
});



app.post("/api/forgotpass", (req, resp) => {
  const email = req.body.email;
  console.log("Received forgot password request for email:", email);
  const sel = "select * from register_detail where email =?";
  con.query(sel,[email],(err,result) =>{
    if (result.length > 0) {
      var uemail = result[0].email;
      var pass = result[0].password;
      const Smtp = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "mycity01012024@gmail.com",
            pass: "sywnhxhhcezzlmvj",
          },
        });
  
      
        const message = {
          from: "ITM SLS    ",
          to: email,
          subject: "Account Password",
          html: `<p>Hello ${uemail},</p>
          <p>The password of your account is <br><h2>${pass}</h2></p>
          <p>Please do not share this email to anyone for your account security purposes.</p>
          <i>If you have any questions or concerns, please contact our support team.</i>
          <p>Thank you!</p>`,
        };
  
        Smtp.sendMail(message, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            resp.send("Email Sent to your registered Email Id");
          }
        });
    }

    else{
      resp.send({ message: "Your Email Id not Registered" });
    }
  });
  
});



app.post("/api/postservice", (req, resp) => {
  let upload = multer({ storage: storage }).single('image');
  
  upload(req, resp, function(err) {
    if (!req.file) {
      console.log("Image not found");
      return resp.status(400).json({ msg: "No image uploaded" });
    }

    const imgsrc = req.file.filename;
    const sname = req.body.sname;       
    const city = req.body.city;        
    const price = req.body.price;      
    const description = req.body.desc;        

    console.log({ sname, description, city, imgsrc, price });


    const insertQuery = "INSERT INTO service_detail (sname, description, city, image, price) VALUES (?, ?, ?, ?, ?)";
    
    con.query(insertQuery, [sname, description, city, imgsrc, price], (error, result) => {
      if (error) {
        console.error("Database error:", error);
        return resp.status(500).json({ msg: "Database error" });
      }
      resp.json({ msg: "Service added successfully" });
    });
  });
});


app.get("/api/service_get", (req, resp) => {
  const query = "SELECT * FROM service_detail";
  con.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching services:", err);
      return resp.status(500).json({ msg: "Server error while fetching services" });
    }
    resp.send(result);  
  });
});



app.post('/api/service_booking', (req, res) => {
  const { id, price, email } = req.body;

  // Optional: Validate incoming data (helps prevent errors and bad DB input)
  if (!id || !price || !email) {
    return res.status(400).send("Missing required fields (id, price, email)");
  }

  // First, ensure the service with this ID exists (optional but clean)
  const checkServiceQuery = "SELECT * FROM service_detail WHERE sid = ?";
  con.query(checkServiceQuery, [id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Service Check Error:", checkErr);
      return res.status(500).send("Database error while validating service ID.");
    }

    if (checkResult.length === 0) {
      return res.status(404).send("Service not found. Cannot proceed with booking.");
    }

    // Proceed with booking after validation
    const insertQuery = "INSERT INTO booking_table(sid, price, email) VALUES (?, ?, ?)";
    con.query(insertQuery, [id, price, email], (err, result) => {
      if (err) {
        console.error("Booking Error:", err);
        return res.status(500).send("Error saving service booking. Check foreign key constraint.");
      }

      // Send confirmation email via nodemailer
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "mycity01012024@gmail.com",
          pass: "sywnhxhhcezzlmvj", 
        },
      });

      const message = {
        from: "Viseas Travel <mycity01012024@gmail.com>",
        to: email,
        subject: "🧾 Booking Confirmation - Viseas Service",
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2 style="color: #0d6efd;">Thank You for Your Booking!</h2>
            <p>Hello <b>${email}</b>,</p>
            <p>We're excited to confirm your booking for a service on <b>Viseas</b>! 🧳</p>
            <p><strong>Amount Paid:</strong> ₹${price}</p>
            <p>Your booking has been recorded successfully. You will be contacted soon with further details.</p>
            <br>
            <p style="color: #198754;">Have a great journey ahead! 🚀</p>
            <hr>
            <small>This is an automated email. Please do not reply.</small>
          </div>
        `
      };

      transporter.sendMail(message, (emailErr, info) => {
        if (emailErr) {
          console.error("Email Error:", emailErr);
          return res.status(200).send("Service booked, but failed to send confirmation email.");
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).send("Service booked and confirmation email sent.");
        }
      });
    });
  });
});





app.listen(6369, () =>
  console.log("Server running at http://localhost:6369")
);
con.connect(function () {
  console.log("Connected Successfully");
}); 
