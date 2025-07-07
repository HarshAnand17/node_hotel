const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');
const{jwtAuthMiddleware,genrateToken}=require('./../jwt')

//Post route to add a person
router.post('/signup',async (req,res)=>{
    try{
      const data=req.body //Assuming the request body contains the person data
      //Create a new Person document using the Mongoose model
      const newPerson=new Person(data);
      //Save the new Person to the databse
      const response=await newPerson.save();
      console.log('data saved');
   
      const payload={
        id:response.id,
        username:response.username
      }
    //  console.log(JSON.stringify(payload));
      const token=genrateToken(payload);
      console.log("Token is : ",token)
      res.status(200).json({response:response,token:token});
      
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

//Profile route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
      //req.user is data attached by jwtAuthMiddleware
      //it contains the user data extracted from the JWT token
      const userData=req.user;//Extract user data from the request object (payload of the jwt token)
      console.log("User Data :",userData);
      const userId=userData.id;
      const user=await Person.findById(userId);
      res.status(200).json({user})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error:'Interna Server Error'});
    }
})
//get method to get the person
 router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data)
    }
    catch(err) {
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
 })
 //Login Route
  router.post('/login',async(req,res)=>{
    try{
        //Extract username and password from the request body
        const{username,password}=req.body;

        //find the user by username
        const user=await Person.findOne({username:username});
        //if user does not exist or password does not match,return error
        if(!user || !(await user.comparePassword(password))) {
          return res.status(401).json({error:'Invalid username or password'})
        }
        //generate token
        const payload={
          id:user.id,
          username:user.username
        }
        const token=genrateToken(payload);
        //return token as response
        res.json({token})
    }
    catch(err) {
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
  })
  router.get('/:workType',async(req,res)=>{
      try{
         const workType=req.params.workType;//Extract the work type from the URL parameter
         if(workType=='chief' || workType=='manager' || workType=='waiter') {
           const response=await Person.find({work:workType});
           console.log('response fetched')
           res.status(200).json(response);
         }
         else{
           res.status(404).json({error:'Invalid work type'});
         }
      }
      catch(err) {
          console.log(err);
          res.status(500).json({error:'Internal Server Error'})
      }
  })

  router.put('/:personid',async (req,res)=>{
     try{
        const personId=req.params.personid;//Extract the id from URL parameter
        const updatedPersonData=req.body;//Updated data for the person
         
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,//Return the updated document
            runValidators:true//Run Mongoose validation
        })
        if(!personId) {
          return res.status(404).json({error:'Person not found'})
        }
        console.log('data updated');
        res.status(200).json(response);

     }
     catch(err) {
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
     }
  })

  router.delete('/:personid',async (req,res)=>{
    try{
       const personId=req.params.personid;//Extract the id from URL parameter
        
       const response=await Person.findByIdAndDelete(personId)
       if(!personId) {
         return res.status(404).json({error:'Person not found'})
       }
       console.log('data deleted');
       res.status(200).json({message:'person Delelted sucessfully'});

    }
    catch(err) {
     console.log(err);
     res.status(500).json({error:'Internal Server Error'})
    }
 })

  module.exports=router