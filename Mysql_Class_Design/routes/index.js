const express = require('express');
const router = express.Router();
const login = require('./login');
const reg = require('./reg');
const all = require('./all');
const add = require('./add');
const del = require('./del');
const update = require('./update');
const find = require('./find');

/* GET home page. */
router.get('/', (req, res) => {
	res.json({
		data: 'Welcome to Contact'
	});
});

//路由分发

/**
 * 用户注册
 */
router.use('/reg', reg);

/**
 * 用户登录
 */
router.use('/login', login);

/**
 * 拦截非法用户
 */
router.use('/', all);

/**
 * 新增学生信息
 */
router.use('/add', add);

/**
 * 删除学生信息
 */
router.use('/del', del)

/**
 * 修改已有信息
 */
router.use('/update', update);

/**
 * 查询信息
 */
router.use('/find', find);

module.exports = router;
