//install express,fomidable
var express = require('express')
//解析表单，支持get post请求参数，文件上传等，此处用于处理post
const formidable = require('formidable')
var app = express()

const DAO = require('./封装1')
//新建一个db，db名字为test2，表名为user2，dao类是对数据库的操作
const dao = new DAO('mongodb://localhost:27017/', 'test2', 'user2')

app.get('/', (req, res) => {
    res.send('hello')
})

//查询完整数据库结构
app.get('/init0', (req, res) => {
    dao.query().then(result => {
        res.send(result)
    })
})
//在这里写删除增加的业务逻辑
//init只能查id
app.get('/init', (req, res) => {
    // console.log(res.query)
    if (req.query.coures_id) {//前端的特定查询条件
        let id = { coures_id: req.query.coures_id }
        dao.query(id).then(result => {
            res.send(result)
        })
    } else {
        dao.query().then(result => {
            res.send(result)
        })
    }
})
//init2查课程名称
app.get('/init2', (req, res) => {
    if (req.query.name) {//前端的特定查询条件
        let name = { name: req.query.name }
        dao.query(name).then(result => {
            res.send(result)
        })
    } else {
        dao.query().then(result => {
            res.send(result)
        })
    }
})
//init3查老师id
app.get('/init3', (req, res) => {
    if (req.query.teacher_id) {//前端的特定查询条件
        // console.log(req.query.teacher_id)
        let teacher_id = { teacher_id: req.query.teacher_id }
        dao.query(teacher_id).then(result => {
            res.send(result)
        })
    } else {
        res.send('err')

    }
})
//init4查学生id
app.get('/init4', (req, res) => {
    if (req.query.student_id) {//前端的特定查询条件
        // console.log(req.query.teacher_id)
        let student_id = { student_id: req.query.student_id }
        dao.query(student_id).then(result => {
            res.send(result)
        })
    } else {
        res.send('err')

    }
})

//添加数据
app.post('/add', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        let obj = {
            coures_id: fields.coures_id, name: fields.name, course_time: fields.course_time,
            course_points: fields.course_points, course_ablity: fields.course_ablity, student_id: fields.student_id,
            teacher_id: fields.teacher_id, course_introduction: fields.course_introduction, course_herf: fields.course_herf
        }
        dao.insert(obj).then(result => {
            res.send('插入成功')
        })
    })
})
//删除数据
app.post('/del', (req, res) => {
    let form = new formidable.IncomingForm()
    // parse方法解析node.js中request请求中包含的form表单提交的数据
    form.parse(req, (err, fields, files) => {
        //设置，通过name删除对象
        let obj = { coures_id: fields.coures_id, student_id: fields.student_id, name: fields.name }
        dao.del(obj).then(result => {
            res.send('删除成功')
        })
    })
})
//修改数据
app.post('/update', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        //obj为原来的值，upd为修改值
        let obj = { course_time: fields.flitertime }
        let upd = { course_time: fields.time }
        dao.update(obj, upd).then(result => {
            res.send('修改成功')
        })
    })
})
app.get('/page', (req, res) => {
    currentPage = req.query.currentpage
    pageSize = req.query.pagesize
    dao.queryByPage(currentPage, pageSize).then(result => {
        res.send(result)
    })
})
//删除知识点
app.post('/update1', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        //obj为原来的值，upd为修改值
        let obj = { course_points: fields.fliterpoint }
        let upd = { course_points: fields.point }
        dao.update(obj, upd).then(result => {
            res.send('修改成功')
        })
    })
})
//增加知识点
app.post('/update2', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        //obj为原来的值，upd为修改值
        let obj = { course_points: fields.fliterpoint }
        let upd = { course_points: fields.point }
        dao.update(obj, upd).then(result => {
            res.send('修改成功')
        })
    })
})

//删除一些num
app.post('/update3', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        //obj为原来的值，upd为修改值
        let obj = { course_ablity: fields.fliteridx }
        let upd = { course_ablity: fields.idx }
        dao.update(obj, upd).then(result => {
            res.send('修改成功')
        })
    })
})
//增加一些num
app.post('/update4', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        //obj为原来的值，upd为修改值
        let obj = { course_ablity: fields.fliteridx }
        let upd = { course_ablity: fields.idx }
        dao.update(obj, upd).then(result => {
            res.send('修改成功')
        })
    })
})

app.post('/update5', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        //obj为原来的值，upd为修改值
        let obj = { coures_id: fields.fliterid }
        let upd = { course_ablity: fields.ablity }
        dao.update(obj, upd).then(result => {
            res.send('修改成功')
        })
    })
})


//监听端口
app.listen(3000, () => {
    console.log('running at port 3000')
})