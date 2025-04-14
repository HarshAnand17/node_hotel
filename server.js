// function callback() {
//     console.log('now adding is sucessful complete');
// }
// const add=function(a,b,callback) {
//       console.log(a+b);
//       callback();
// }
// add(9,2,callback)


// const add=function(a,b,prince) {
//   console.log(a+b);
//   prince();
// }

// add(2,6,function() {
//     console.log("now completed");
// })
// add(2,9,()=>console.log("add compled"));

//OS and FS
// var fs=require('fs');
// var os=require('os');

// var user=os.userInfo();
// console.log(user);

// fs.appendFile('greeting.txt ','Hi'+user.username+'!',()=>{
//    console.log('file is created');
// })
// console.log(os)

// const notes=require('./notes');
// console.log(notes)
// console.log('server file is available')

// var age=notes.age
// console.log(age);
// var result=notes.addNumber(age+18,10);
// console.log(result);

// var p=require('lodash');

// var data=["person","person",1,2,1,2,'name','age','2'];
//  var filter=p.uniq(data);
//  console.log(filter);

//  console.log(p.isString(2));

//const jsonString='{"name":"john","age":30,"city":"new york"}';
// const jsonObject=JSON.parse(jsonString);
// console.log(jsonObject.name);

// const objectToConverter={
//     name:"Alice",
//     age:25
// };

// const json=JSON.stringify(objectToConverter);
// console.log(json);

// console.log(typeof json);

const express = require('express')
const app = express()
const db=require('./db')

const bodyParser=require('body-parser');
app.use(bodyParser.json()) //req.body main store karega

const Person=require('./models/Person');
const MenuItem=require('./models/MenuItem')

app.get('/', function (req, res) {
  res.send('welcome to website how can i help you')
})
// app.get('/chicken',(req,res)=>{
//      res.send('sure sir,i would love to serve the chicken')
// })
// app.get('/idli',(req,res)=>{
//      var customized_idli={
//          name:'rava idli',
//          size:'10 cm diameter',
//          is_sambhar:true,
//          is_chutney:false,
//      }
//      res.send(customized_idli)
// })



//import the router files
const personRoute=require('./routes/personRoutes');
const MenuItemRoute=require('./routes/menuItemRoutes')
//use the routers
app.use('/person',personRoute)
app.use('/menu',MenuItemRoute)
app.listen(3000,()=>{
  console.log('listening on port 3000');
})//