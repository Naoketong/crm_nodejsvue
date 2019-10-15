var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.js');
var authController = require('./../controllers/auth.js');
// var authMiddleware = require('./../middlewares/auth.js');
var clueController = require('./../controllers/clue.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', authController.login);

router.get('/user',/*authMiddleware.mustLogin,*/ userController.show);//获取所有人员
router.post('/user',/*authMiddleware.mustLogin,*/ userController.insert);//新增人员
router.get('/user/:id',/*authMiddleware.mustLogin,*/ userController.alone);//获取个人信息
router.put('/user/:id', userController.update);//修改个人信息
router.delete('/user/:id', userController.delete);//删除个人信息


router.get('/clue', clueController.show);

router.post('/clue',clueController.insert);
router.get('/clue/:id', clueController.log);
router.put('/clue/:id' , clueController.update);
router.post('/clue/:id', clueController.addLog);


module.exports = router;
