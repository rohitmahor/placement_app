const express = require('express');
const path = require('path');
const database = require('./mongo');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const expressValidator = require('express-validator');
var hbs = require('express-handlebars');
const randomstring = require('randomstring');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var flash = require('connect-flash');
const nodemailer = require('nodemailer');
const sanitize = require('mongo-sanitize');
const request = require('request');
const app = express();

app.use(cors());

app.engine('hbs',hbs({extname:'hbs',defaultLayout: 'main',layoutsDir:__dirname+'/views/layouts'}))
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('keyboard cat'));
app.use(expressValidator());
app.use(session({
    secret: "keyboard cat",
    store: new MongoStore({ url: 'mongodb://localhost:27017' }),
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use('/',express.static(path.join(__dirname,'public_static/Home')));

app.use('/company',companyAuth,express.static(path.join(__dirname,'public_static/company')));

app.use(express.static(path.join(__dirname,'public_static/dist')));

app.get('/dash',studentAuth,(req, res) => {
    res.sendFile(path.join(__dirname + '/public_static/dist/index.html'));
});

app.post('/jnf',function(req,res){
    var data = req.body;
    console.log(data.type);
    var jnf = req.body.jnf;
    if(data.type === "submit" && jnf !== undefined) {
        var companyuser = req.session.passport.user[0];
        database.push('company-users',{userid:sanitize(companyuser.userid)},{jnf:sanitize(jnf)},function(data){
            console.log(data);
        });
        var cmp = companyuser.cmpName;
        var obj = {};
        obj[cmp] = [];
        obj.cmpName= cmp;
        database.insert('applied',sanitize(obj),function(data){
            console.log('company save');
            res.send('successfully saved');
        });
    }
    else if(data.type === "get") {
        var data1 = {};
        var roll = req.session.passport.user[0].rollno;
        database.findDoc('company-users',null,function(err,result){
            data1.companies = [];
            result.forEach(function(x,i){
                data1.companies.push({jnf:sanitize(result[i].jnf),cmpDetails:sanitize(result[i].cmpDetails)});
            });

            database.findDoc('users',{'rollno':sanitize(roll)},function(err,result) {
                data1.applied = result[0].applied;
                res.send(data1);
            });

        });

    }
    else {
        res.send('Something went wrong');
    }

});


app.post('/cmpDetails',function(req,res){
    var data = req.body;
    console.log(data.type);
    if(data.type === "submit" && data.cmpDetails !== undefined) {
        database.update('company-users',{userid:sanitize(req.session.passport.user[0].userid)},{cmpDetails:sanitize(data.cmpDetails)},function(data){
            console.log(data);
            res.send('Successful');
        });
    }
    else if(data.type === "get") {
        var data1 = {};
        database.findDoc('company-users', {userid:sanitize(req.session.passport.user[0].userid)},function(err,result){
            data1= result[0].cmpDetails ;
            res.send(data1);
        });
    }
    else {
        res.send('Something went wrong');
    }
});

app.post('/applied',(req,res)=>{
    var cmpName = req.session.passport.user[0].cmpName;
    database.findDoc('applied',{cmpName:cmpName},function(err,result1){
        database.findDoc('company-users',{cmpName: cmpName},function(err,result2){
            res.send({selectList : result2[0].selected , shortlist : result1[0].students });
        })
    })



    // database.marks('cse_batch_2015',{},obj,function(data){
        // res.send(data[1][1]);
        // var arr = [],count = 0;
        // Object.entries(data[3][4]).forEach(
        //     ([key, value]) => {
        //         if (!isNaN(value.agg))
        //             arr.push({key:key,marks:value.agg});
        //         else {
        //             arr.push({key:key,marks:0});
        //         }
        //         count++;
        //     });
        // function compare(a,b) {
        //     if (a.marks < b.marks)
        //         return 1;
        //     if (a.marks > b.marks)
        //         return -1;
        //     return 0;
        // }
        // arr.sort(compare);
        // res.send(data);
        // var  y;
        // var x = arr.find(function(x,i){
        //     if(x.key === "08814802715")
        //          y = {"i":i,"marks":x.marks};
        //     return y;
        // });
        // console.log(x);
        // for(let i=0;i<arr.length;i++){
        //     // if(arr[i].key){
        //         fs.writeFileSync('rank.txt',JSON.stringify(arr[i])+'\n',{'flag':'a+'});
        //     // }
        // }
        // console.log(count);
    // });
});


app.post('/apply', (req,res)=>{

  var cmpName = req.body.cmpName;
  var cmpDesig = req.body.cmpDesig;
  var roll = req.session.passport.user[0].rollno;
  var legal = true;
  console.log(req.body);

    database.findDoc('users',{'rollno':sanitize(roll)},function(err,result) {
      console.log(result[0].applied);
      if (result[0].applied.length !== 0) {
          result[0].applied.forEach(function (x, i) {
              if (x.cmpName === cmpName && x.cmpDesig === cmpDesig) {
                  console.log('illegal');
                  res.send('You are already applied for ' + cmpName);
                  legal = false;
                  return 0;
              }
          });
      }

          if(legal) {
              var tempAgg = [];
              var sum = 0;
              var obj = {};
              for(let i = 1;i<9;i++)
                  obj[i+"."+roll] = 1;
              database.marks('cse_batch_2015',sanitize({}),sanitize(obj),function(data){
                  data.forEach(function(x,i){
                      sum+=x[i+1][roll]["agg"];
                      tempAgg.push(x[i+1][roll]["agg"]);
                  });
                  var stdDetails = {roll:roll,name:data[0][1][roll]["name"],marks:tempAgg,finalAgg:sum/data.length,cmpDesig:req.body.cmpDesig}
                  database.push('applied',sanitize({"cmpName":cmpName}),sanitize({students:stdDetails}),function(err,data){
                      console.log("company data successfully saved");
                  });
              });

              database.push('users',sanitize({"rollno":roll}),{applied:sanitize(req.body)},function(err,data){
                  console.log("student data successfully saved");
                  res.send("Successfully applied for "+cmpName);
              });
          }
  });
});

app.post('/signout',(req,res)=>{
  console.log('Signed out');
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

app.post('/signup',(req,res)=>{
    var repassword = req.body.repassword;
    var roll = req.body.roll;
    var email = req.body.email;
    var password = req.body.password;
   req.checkBody('roll','Invalid Roll No.').notEmpty().isInt().len(11);
    req.checkBody('email','Invalid Email Address').notEmpty().isEmail();
    req.checkBody('password','password must contain 6-20 character').len(6,20);
    req.checkBody('password','Password do not match').equals(repassword);

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.send(result.array());
            return;
        }

        else {
            database.findDoc('users',{'rollno':sanitize(roll)},function(err,data){
                if(data.length !== 0) {
                    res.send([{msg:"User already exist"}]);
                }

                // var obj = {};
                // obj["4."+roll] = 1;
                //
                // database.marks('cse_batch_2015',{},obj,function(data){
                //    if(data[3][4][roll]){
                //        console.log();
                //    }
                // })

                else {
                    var hash = bcrypt.hashSync(password, saltRounds);
                    var token  = randomstring.generate();
                    database.insert("users",{
                        "rollno":roll,
                        "password":hash,
                        "email":email,
                        "token": token ,
                        "active": false,
                        "applied":[]
                    },function(data){console.log(data);});

                    res.send(false);

                    let transporter = nodemailer.createTransport({
                        service:'gmail',
                        // secure: true, // secure:true for port 465, secure:false for port 587
                        auth: {
                            user: <email>,
                            pass: <password>
                        }
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Rohit mahor" <rohitmahor09876@gmail.com>', // sender address
                        to: email, // list of receivers
                        subject: 'no-reply', // Subject line
                        text: token, // plain text body
                        html: '<b>Thank for signup :)</b>'+
                        '<p>For verify your email</p>'+
                        '<a href="http://localhost:5000/verify/'+token+'">click here</a>'// html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                    });

                }
            })
        }
    })
});

app.route('/verify/:token')
    .get((req,res)=>{
    // res.render('verify',{alert:'Please wait for mail and enter secret code.'});
        var code = req.params.token;
        database.findDoc('users',{'token':sanitize(code)},function(err,data){
            console.log(data);
            if(data.length === 0) {
                console.log('inside if');
                res.render('error');
            }

            else if(data.length!==0 && !data[0].active){
                var data2 = {'token':'','active':true};
                database.update('users',sanitize({'token':code}),data2,function(err,result){
                    console.log(err,result);
                    res.render('verify');
                });
            }
        });
    });

app.get('/forgot',function(req,res){
    res.render('forgot')
});

app.post('/forgot',function(req,res){
   database.findDoc('users',sanitize({"email":req.body.email}),function(err,data){
       if(data.length){
           console.log(data);
           let token = randomstring.generate();
           database.update('users',sanitize({"email":req.body.email}),{'token':token},function(err,data){})
           let transporter = nodemailer.createTransport({
               service:'gmail',
               // secure: true, // secure:true for port 465, secure:false for port 587
               auth: {
                   user: <email>,
                   pass: <password>
               }
           });

           // setup email data with unicode symbols
           let mailOptions = {
               from: '"Rohit mahor" <rohitmahor09876@gmail.com>', // sender address
               to: req.body.email, // list of receivers
               subject: 'no-reply', // Subject line
               text: token, // plain text body
               html: '<p>For reset your password </p>'+
               '<a href="http://localhost:5000/reset/'+token+'">click here</a>'// html body
           };

           // send mail with defined transport object
           transporter.sendMail(mailOptions, (error, info) => {
               if (error) {
                   return console.log(error);
               }
               else {
                   res.render('forgot',{error: "Check your email :)"});
               }
           });
       }
   })
});

var code1;
app.get('/reset/:token',function(req,res){
   var code = req.params.token;
   code1 = code;
       database.findDoc('users',sanitize({'token':code}),function(err,data){
           if(data.length === 0) {
               console.log('inside if');
               res.render('error');
           }
           else if(data.length!==0){
               res.render('reset');
           }
       });
});

app.post('/reset',function(req,res){
    database.findDoc('users',sanitize({'token':code1}),function(err,data){
        if(data.length === 0) {
            console.log('inside if');
            res.render('error');
        }
        else if(data.length!==0){
            var data2 = {'token':'','active':true,'password': bcrypt.hashSync(req.body.password, saltRounds)};
            database.update('users',sanitize({'token':code1}),data2,function(err,result){
                res.render('verify');
                code1 = null;
            });
        }
    });
});

app.post('/contactDetails',function(req,res){
    req.checkBody('cmpName','Fill company name.').notEmpty();
    req.checkBody('cmpEmail','Fill company email properly.').notEmpty().isEmail();
    req.checkBody('cmpAdd','Fill company address.').notEmpty();
    req.checkBody('cmpPhone','Fill company phone.').notEmpty();

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.send(result.array());
            return;
        }
        else {
            database.insert('contactUs',req.body,function(err,result){
               console.log(result);
            });
            res.send([{msg:"Your details successfully send to TnP office."}]);
        }
    });

});

app.route('/select')
    .post(function(req,res){
        var arr = req.body;
        // var arr = [{roll: "08814802715"},{roll: "09214802715"}];
        var data = {selected:arr};
        var cmp = req.session.passport.user[0].cmpName;
        // var cmp = 'TCS';
        database.update('company-users',{cmpName:cmp},data,function(err,result){
            console.log(result);
        });
        arr.forEach(function(x,i){
            database.findDoc('users',{rollno:x.roll},function(err,result){
                if (result.length) {
                    let transporter = nodemailer.createTransport({
                        service:'gmail',
                        // secure: true, // secure:true for port 465, secure:false for port 587
                        auth: {
                            user: <email>,
                            pass: <password>
                        }
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Rohit mahor" <rohitmahor09876@gmail.com>', // sender address
                        to: result[0].email, // list of receivers
                        subject: 'no-reply', // Subject line
                        // text: token, // plain text body
                        html: '<b>Congratulation</b>'+
                        '<p>you are selected for '+cmp+'</p>'// html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                    });
                }

            })
        });
      console.log(req);
    var data = {selected:req.body};
    var cmp = req.session.passport.user[0].cmpName;
    database.update('company-users',{cmpName:cmp},data,function(err,result){
        console.log(result);
        res.send({data : "successful"})
    })
}).get(function(req,res){
    var cmp = req.session.passport.user[0].cmpName;
    database.findDoc('company-users',{cmpName: cmp},function(err,result){
        res.send(result[0].selected);
    })
});
// var finalData = {};
// fs.readFile('example3.txt', 'utf8', function(err, data) {
//     var docArray;
//     var count=0;
//     if (err) throw err;
//     docArray=data.toString().split('\n');
//     for(let i=0; i<docArray.length;i++) {
//         var sum=0;
//         var roll = docArray[i].match(/\b\d{11}\b/g);
//         var temp = [];
//         if(roll!== null)
//         {
//             // temp.push(docArray[i+1]);
//             for(let j=2;j<=13;j++) {
//                 temp.push(docArray[i+3*j]);
//                 sum+=parseFloat(docArray[i+3*j].split('(')[0]);
//             }
//             finalData[docArray[i]] = {name:docArray[i+1],marks:temp,agg:sum/(temp.length)};
//             count++;
//         }
//     }
//     console.log(finalData);
//     console.log(count);
// });

function studentAuth(req,res,next) {
    if(req.user[0].rollno) {
        return next();
    }

    else {
        res.redirect('/');
    }
}

function companyAuth(req,res,next) {
    if(req.user[0].userid) {
        return next();
    }

    else {
        res.redirect('/');
    }
}


passport.use(new LocalStrategy(
    function(username, password, done) {
        var roll = username.match(/\b\d{11}\b/g);
        if(roll!==null) {
            database.findDoc("users",{"rollno":sanitize(username)},function(err, data) {
                if (err) { return done(err); }
                console.log(data);
                if (data.length === 0) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!bcrypt.compareSync(password, data[0].password)) {
                    console.log('incorrect password');
                    return done(null, false, { message: 'Incorrect password.' });
                }
                if(!data[0].active) {
                    return done(null,false,{message: 'Please verify your email first'})
                }
                return done(null, data);
            });
        }

        else {
            database.findDoc("company-users",{"userid":sanitize(username)},function(err, data) {
                if (err) { return done(err); }
                console.log(data);
                console.log(username,password);
                if (data.length === 0) {
                    console.log("incorrect user");
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (password!==data[0].password) {
                    console.log('incorrect password');
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, data);
            });

        }

    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

app.post('/login',
    passport.authenticate('local', { successRedirect: '/dash',
        failureRedirect: '/'})
);

app.post('/company-login',
    passport.authenticate('local',{successRedirect:'/company',
    failureRedirect: '/'})
);

database.connectDB(function(){
    app.listen(5000,function(err){
        if(err) throw err;
        console.log('Server is running on 5000');
        // uncomment only when add  new semester marks
        // database.insert('cse_batch_2015',{"4":finalData},function(){
        //     console.log('Store successfully');
        // })
    });
});
