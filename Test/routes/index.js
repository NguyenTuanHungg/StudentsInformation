var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
/* GET home page. */
  try{
     mongoose.connect('mongodb://127.0.0.1:27017/HoaBinh', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false ,

    });
    console.log('success')
    }
    catch(error){
      console.log('error')
    }


// tạo collection
let Student=mongoose.Schema({
  name:{
    type:String,
  },
  sex:{
    type:String
  },
  address:{
    type:String
  },

  date:{
    type:Date
  }

},{
  collection:'Student'
}
)

let Students=mongoose.model('Student',Student)
  /* GET home page. */
router.get('/api/students', function(req, res, next) {
  Students.find({},(error,data)=>{
    if(!error) {
      res.send(data)
    }
    else{
      console.log(error)
    }
    console.log('ds lop:',data)
    
  })
});

// Thêm sinh viên
router.post('/api/students/add', function(req, res, next) {
  const std= new Students(
    {
      name:req.body.name,
      sex:req.body.sex,
      date:req.body.date,
      address:req.body.address
    }
  )
  std.save((err,data)=>{
    res.status(200).json({code:200,message:'add successfully',addStudent:data})

  })

 
})

// xem thông tin chi tiết từng sinh viên 
router.get('/api/students/:id',(req,res)=>{
Students.findById(req.params.id,(err,data)=>{
  if(!err){
    res.send(data);
  }
  else{
    console.log(err)
  }
})
})
// Cập nhật thông tin sinh viên
router.put('/api/students/edit/:id',(req,res)=>{
  const std={
    name:req.body.name,
    sex:req.body.sex,
    date:req.body.date,
    address:req.body.address
  }

  Students.findByIdAndUpdate(req.params.id,{$set:std},{new:true},(err,data)=>{
    if(!err){
      res.status(200).json({code:200,message:"Update successfully",Update:data})

    }
    else{
      console.log(err)
    }
  })
})
// Xóa thông tin sinh viên
router.delete('/api/students/:id',(req,res)=>{
  Students.findByIdAndDelete(req.params.id,(err,data)=>{
    if(!err){
      res.status(200).json({code:200,message:"Delete successfully"})
    }
    else{
      console.log(err)
    }
  })
})


  

module.exports = router;
