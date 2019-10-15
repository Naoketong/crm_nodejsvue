const Clue = require('./../models/clue.js');
const ClueLog = require('./../models/log.js');
const User = require('./../models/user.js');
const { formatTime } = require('./../utils/date.js');

const clueController = {
  insert: async function(req,res,next){
    let name = req.body.name;
    let phone = req.body.phone;
    let utm = req.body.utm;
    let created_time = new Date();

    if(!name || !phone){
      res.json({ code: 0, message: '缺少必要参数' });
      return
    }

    try{
      const clues = await Clue.insert({  name, phone, utm, created_time });
      res.json({ 
        code: 200, 
        data: clues
      })
    }catch(e){
      console.log(e)
      res.json({ 
        code: 0, 
        message: '内部错误' 
      })
    }
  },
  // show: async function(req,res,next){
  //   try{
  //     const role = req.body.role;
  //     const user_id = req.body.user_id;
  //     console.log(role,user_id)
  //     const page = req.query.page || 1;
  //     const limit = req.query.limit || 10;
  //     let pagination = { page, limit }
  //     let params = {};
  //     if (role == 2) {
  //       params.user_id = user_id
  //     }
  //     const count = await Clue.count(params);
  //     const sum = count[0].sum;
  //     const clues = await Clue.joinUser(params, pagination);
  //     res.locals.clues = clues.map((data)=>{
  //       data.created_time_display = formatTime(data.created_time);
  //       return data
  //     });
  //     let pageNumber = Math.ceil(sum/limit);
  //     let pageArray = new Array(pageNumber).fill('').map((item, index) => index + 1);
  //     res.json({
  //       code: 200,
  //       message:'cg ',
  //       count: count,
  //       clues: clues,
  //     })
  //     // res.locals.pagination = {
  //     //   total: sum,
  //     //   pageSize: limit,
  //     //   current: page,
  //     //   pageArray: pageArray
  //     // }
  //   }catch(e){
  //     console.log(e);
  //     res.json({
  //       code: 0,
  //       message:'内部错误'
  //     })
  //   }
  // },
  show: async function(req,res,next){
    try{
      const clue = await Clue.all();
      res.json({
        code:200,
        data:clue,
        message:'获取成功'
      })
    }catch(err){
      console.log(err);
      res.json({
        code:0,
        message:'内部错误'
      })
    }

  },
  log: async function(req,res,next) {
    try{
      const id = req.params.id;
      const clues = await Clue.select({ id })
      const logs = await ClueLog.select({ clue_id : id})
      const users = await User.select({ role: 2 })
      clues.forEach((data)=>{
        data.created_time = formatTime(data.created_time)
      })
      logs.forEach((data)=>{
        data.created_time = formatTime(data.created_time)
      })
      users.forEach((data)=>{
        data.created_time = formatTime(data.created_time)
      })
      res.json({
        code:0,
        message:'获取成功',
        clues:clues,
        logs:logs,
        users:users,
      })
    }catch(e){
      console.log(e)
      res.json({
        code: 0,
        message:'内部错误', 
      })
    }
  },
  update: async function(req,res,next) { 
    let id = req.params.id;

    let status = req.body.status;
    let remark = req.body.remark;
    let user_id = req.body.user_id;
    
    // if(!status || !remark){
    //   res.json({ code: 0, message: '缺少必要参数' });
    //   return
    // }

    try{
      const clue = await Clue.update( id ,{  status, remark, user_id });
      res.json({ code: 200,  data: clue, message:'修改成功' })
    }catch(e){
      console.log(e)
      res.json({  code: 0, message: '内部错误'})
    }
  },
  addLog: async function(req,res,next){
    let content = req.body.content;
    let created_time = new Date();
    let clue_id = req.params.id;
    if(!content){
      res.json({ code: 0, message: '缺少必要参数' });
      return
    }

    try{
      const clue = await ClueLog.insert({  content, created_time, clue_id });
      res.json({ code: 200, data: clue })
    }catch(e){
      console.log(e)
      res.json({ code: 0, message: '内部错误'})
    }
  }
}

module.exports = clueController;