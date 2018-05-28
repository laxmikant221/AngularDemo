var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Service = require('../models/services.js');
var BookServices = require('../models/bookService.js');
var passport = require('passport');
var multer = require('multer');
var path = require("path");
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "laxmikant.tripathi6@gmail.com",
        pass: "9179669596"
    }
});
var rand,mailOptions,host,link;

// for registration
router.post('/register', function (req, res, next) {
  addToDB(req, res);
  rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://localhost:4200/verify?id="+rand;
    mailOptions={
        to : req.body.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

router.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});

async function addToDB(req, res) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now(),
    
  });
  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

//for user log in
router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { 
        return res.status(501).json(err); 
      } else {
        return res.status(200).json({message:'Login Success'});
      }
      
    });
  })(req, res, next);
});


router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

// for admin log in
router.post('/adminlogin',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { 
        return res.status(501).json(err); 
      } else {
        return res.status(200).json({message:'Login Success'});
      }
      
    });
  })(req, res, next);
});

router.get('/admin',isAdminUser,function(req,res,next){ 
  return res.status(200).json(req.user);   
});

//user log out
router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

router.get('/adminLogout',isAdminUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated() && !req.user.isAdmin) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}
function isAdminUser(req,res,next) {
  if(req.isAuthenticated() && req.user.isAdmin) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}
// to get all the registered users list
router.get('/listusers',function(req,res,next){ 
  User.find({},function(err, users) { 
    if (err) return next(err);
    return res.json(users);
  });

});
//to get all the services list
router.get('/listservices',function(req,res,next){ 
  Service.find({},function(err, services) { 
    if (err) return next(err);
    return res.json(services);
  });

});

// for storing image using multer
router.use(express.static(path.join(__dirname, 'uploads')));
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/assets/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });
//to add services 
router.post("/saveServices", upload.array("uploads[]", 12), function (req, res) {
  console.log(req.body.forminput);
  var store=JSON.parse(req.body.forminput);
  var imgUrl = req.files[[0]].filename;
  console.log('files', req.files[[0]].filename);
  console.log(req.files,store.pHour);
  var service = new Service({
    serviceName: store.serviceName,
    serviceCategory: store.serviceCategory,
    description: store.description,
    price:store.price,
    address: store.address,
    zipCode: store.zipCode,
    imageUrl: imgUrl,
    creationDate: Date.now(),
    updationDate: Date.now()
    
  })
  try {
    doc = service.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
  res.send(req.body);
});
// search services by keyword
router.get('/searchbyname',function(req,res,next){ 
  const keyword = new RegExp(req.query.searchKeyword, 'i');
  Service.find({ 
    $or:[
    {"serviceName": keyword},
    {"serviceCategory": keyword},
    {"address": keyword},
    {"zipCode": keyword}
    ]},
    function(err, userservices) { 
      if (err) return next(err);
      return res.json(userservices);
    });

});
// to get service by its Id
router.get('/getServiceById',function(req,res,next){
  Service.find({"_id":req.query.id},function(err, service){
    if(err) return next(err);
    return res.json(service);
  })
})
//upadate services by Id
router.put("/updateServiceById", function (req, res) {
  id = req.query.id;
  Service.findByIdAndUpdate(req.query.id, req.body,function(err,req){
    if(err) res.status(501).json(err)
      res.send(req.body);
  })
})
//delete services by Id
router.delete("/deleteServiceById", function (req, res) {
  Service.findByIdAndRemove(req.query.id,function(err,req){
    if(err) res.status(501).json(err)
      res.send(req.body);
  })

})
//to get service details
router.get('/getServiceDescription',function(req,res,next){
  Service.find({"_id":req.query.id},function(err, description){
    if(err) return next(err);
    return res.json(description);
  })
})
//to book services
router.post('/bookServices',function(req,res,next){
  var bookService = new BookServices({
    email: req.body.email,
    customerName: req.body.customerName,
    mobileNumber: req.body.mobileNumber,
    address: req.body.address,
    pinCode: req.body.pinCode,
    timeSlot: req.body.timeSlot,
    serviceId: req.body.serviceId,
    serviceName: req.body.serviceName,
    creation_dt: Date.now()
    
  });
  try {
    doc = bookService.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }

})
//to get booking history
router.get('/userBookings',function(req,res,next){ 
  BookServices.find({"email": req.query.email},function(err, bookedServices) { 
    if (err) return next(err);
    return res.json(bookedServices);
  });
});

router.get('/serviceBooked', function(req,res,next){
  BookServices.aggregate([
  {
    $lookup:{
      from:"services",
      localField:"serviceId",
      foreignField:"_id",
      as:"bookings"}
    }
    ]).exec().then(function(data) {
      console.log(data[0].bookings)
      return res.json(data)
    }).catch(function(err){
      console.log(err)
    })
})

//cancel booking
router.delete("/cancelBooking", function (req, res) {
  BookServices.findByIdAndRemove(req.query.id,function(err,req){
    if(err) res.status(501).json(err)
      res.send(req.body);
  })

})

router.get('/getBookingInfoById',function(req,res,next){
  BookServices.find({"_id":req.query.id},function(err, service){
    if(err) return next(err);
    return res.json(service);
  })
})

router.put("/updateBookingById", function (req, res) {
  id = req.query.id;
  BookServices.findByIdAndUpdate(req.query.id, req.body,function(err,req){
    if(err) res.status(501).json(err)
      res.send(req.body);
  })

})
module.exports = router;
