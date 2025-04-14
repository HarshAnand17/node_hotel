const express=require('express');
const router=express.Router();

const MenuItem=require('./../models/MenuItem')

//post method to add a menu item
router.post('/',async (req,res)=>{
    try{
       const data=req.body
       const newMenu=new MenuItem(data)
       const response=await newMenu.save()
       console.log('data saved');
       res.status(200).json(response);
    }
    catch(err) {
         console.log(err);
         res.status(500).json({error:'Internal Server Error'});
    }
})
//get method to get the menu items
router.get('/:DishType',async (req,res)=>{
  try{
    const DishType=req.params.DishType;//Extract the work type from the URL parameter
    if(DishType=='spicy' || DishType=='sweet' || DishType== 'sour') {
        const data=await MenuItem.find({taste:DishType});
        console.log('response fetched')
        res.status(200).json(data);
    }
    else{
        res.status(404).json({error:'Invalid work type'});
      }
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})




//comment added for testing purposes
module.exports=router