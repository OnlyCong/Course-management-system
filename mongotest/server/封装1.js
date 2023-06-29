const MongoClient = require('mongodb').MongoClient

class DAO {
    constructor(url, dbName, collectionName) {
        this.url = url
        //库名
        this.dbName = dbName
        //表名
        this.collectionName = collectionName
    }
    _connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, { useUnifiedTopology: true }, (err, client) => {
                if (err) return reject(err)
                resolve(client)
            })
        })

    }
    //插入多条
    insert(obj, isMany) {
        return new Promise((resolve, reject) => {
            this._connect().then(client => {
                let db = client.db(this.dbName)
                if (isMany) {
                    db.collection(this.collectionName).insertMany(obj).then((res) => {
                        resolve(res)
                        client.close()
                    })

                } else {
                    db.collection(this.collectionName).insertOne(obj).then((res) => {
                        resolve(res)
                        client.close()
                    })

                }
            }, (err) => { console.log(err) })
        })

    }
    //删除多条
    del(obj, isMany) {
        return new Promise((resolve, reject) => {
            this._connect().then(client => {
                let db = client.db(this.dbName)
                if (isMany) {
                    db.collection(this.collectionName).deleteMany(obj).then((res) => {
                        resolve(res)
                        client.close()
                    })

                } else {
                    db.collection(this.collectionName).deleteOne(obj).then((res) => {
                        resolve(res)
                        client.close()
                    })

                }
            }, (err) => { console.log(err) })
        })

    }
    //改
    update(obj, updateobj) {
        return new Promise((resolve, reject) => {
            this._connect().then(client => {
                let updatecpy = { $set: updateobj }
                let db = client.db(this.dbName)
                db.collection(this.collectionName).updateMany(obj, updatecpy).then((res) => {
                    resolve(res)
                    client.close()
                })


            }, (err) => { console.log(err) })
        })

    }
    //查
    query(obj) {
        obj = obj || {}//不传的话默认全部
        let arr = []
        return new Promise((resolve, reject) => {
            this._connect().then(client => {

                let db = client.db(this.dbName)
                let querys = db.collection(this.collectionName).find(obj)
                querys.toArray((err, result) => {
                    if (err) {
                        throw (err)
                    }
                    resolve(result)
                })
                // querys.each((err, data) => {
                //     if (data != null) {
                //         arr.push(data)
                //     } else {
                //         resolve(arr)
                //     }

                // })
                // client.close()

            }).catch(err => reject(err))

        })

    }
}

let database = [
    ["82535", "中国建筑史（上）", "10:00-11:30","建筑史建筑背景,现代建筑发展,唐代建筑史,宋代建筑史,清代建筑史",'1010','12','2,4,3,1,5','0'],
    ["82536", "外国工艺美术史", "09:00-09:30","美术概论,意大利工艺美术史,法国工艺美术史,文艺复兴对工艺发展的影响",'1011','13','13,2,5,1','0'],
    ["82537", "心理学概论", "13:00-13:30","心理学概论,心理学应用",'1012','10','4,2','0'],
    ["82538", "经济学原理", "13:45-14:40","经济学概论,经济发展学,经济学应用,现代经济发展",'1013','12','3,2,5,8','1'],
    ["82539", "化工识图以及制图", "15:00-16:00","化工识图以及制图技术,化工识图以及制图方法,化工识图以及制图工具",'1014','10','6,3,2','1'],
    ["82540", "基础化学", "18:00-18:30","化学物质,化学反应,反应条件",'1015','14','3,6,10,2','2'],
    ["82541", "化工设备基础", "10:00-10:30","力学基础知识、工程材料、常用机构",'1016','4','1,2,1','3'],
    ["82542", "煤质分析及煤化工产品检验", "11:00-11:30","煤炭检验、煤炭洗选检测、焦炭检验",'1017','10','2,4,7','4'],
    ["82543", "e时代的大佬师——慕课教师的修炼心法", "11:00-11:30","什么是e时代,e时代的变革,e时代的市场分析",'1018','5','2,3,4','5'],
    ["82544", "大学物理近代物理", "14:00-16:00","力学,天体力学,电学",'1019','12','2,3,8','6'],
    ["82545", "计算机科学和Python编程导论", "15:00-17:00","基础语法,数据结构,函数,对象,通信]",'1020','12','2,3,4,6,8','7'],
    ["82546", "自动控制理论", "10:00-12:00","自动控制理论一,自动控制理论二,自动控制理论三",'1021','14','2,3,7','7'],
    ["82547", "大学国文（下）", "10:00-12:00","国文一,国文二,国文三",'1022','16','2,13,4','8'],
    ["82548", "计算几何", "10:00-12:00","几何基础,几何模型",'1023','15','2,13','9'],
    ["82549", "C++语言程序设计基础", "10:00-12:00","c++基础（上),c++基础(中),c++基础(下)",'1024','14','2,13,4','9'],
    ["82550", "生活英语听说", "10:00-12:00","生活英语听,生活英语说,生活英语写",'1025','12','2,3,10','10'],
    ["82551", "日语与日本文化", "10:00-12:00","日语元音,日语基础,日本文化",'1026','7','2,1,4','11'],
    ["82552", "数据结构（上）", "10:00-12:00","数据结构（上）第一章,数据结构（上）第二章,数据结构（上）第三章",'1027','14','12,3,4','12'],
    ["82553", "操作系统", "10:00-12:00","操作系统第一章,操作系统第二章,操作系统第三章",'1028','14','2,3,4','12'],
    ["82554", "数据结构(下)", "10:00-12:00","数据结构（下）第一章,数据结构（下）第二章,数据结构（下）第三章",'1029','12','10,3,4','12'],
    ["82555", "逻辑学概论", "10:00-12:00","逻辑学概论第一章,逻辑学概论第二章,逻辑学概论第三章",'1030','10','2,9,4','13'],
    ["82556", "线性代数", "10:00-12:00","线性代数第一章,线性代数第二章,线性代数第三章",'1031','11','2,3,10','13'],
    ["82557", "程序设计基础", "10:00-12:00","程序设计基础第一章,程序设计基础第二章,程序设计基础第三章,程序设计基础第四章",'1032','15','2,3,4,10','14'],
    ["82558", "汇编语言程序设计", "10:00-12:00","汇编语言程序设计第一章,汇编语言程序设计第二章,汇编语言程序设计第三章",'1033','13','12,3,4','14'],
    ["82559", "分布式存储与资源管理", "10:00-12:00","分布式存储与资源管理第一章,分布式存储与资源管理第二章,分布式存储与资源管理第三章",'1034','16','12,9,14','15'],
    ["82560", "大数据系统基础", "10:00-12:00","大数据系统基础第一章,大数据系统基础第二章,大数据系统基础第三章",'1029','35','12,13,24','15'],
    ["82561", "网络技术与应用", "10:00-12:00","网络基础,网络模型,网络应用",'1036','5','2,3,1','16'],
    ["82562", "计算机科学101", "10:00-12:00","什么是计算机?,计算机基础",'1037','11','12,6','16'],
    ["82563", "计算机科学和Python编程导论", "10:00-12:00","计算机基础,python导论,python基础",'1038','11','2,13,4','16'],
    ["82564", "数字电子技术基础", "10:00-12:00","电子信号,数电模型",'1039','21','12,7','17'],
    ["82565", "C++语言程序设计进阶", "10:00-12:00","c++的起源,c++的模型,c++基础",'1040','13','12,3,2','18'],
    ["82566", "葡萄酒的世界：从葡萄到美酒", "10:00-12:00","葡萄酒的产地,葡萄酒的历史葡萄酒的发酵,葡萄酒的风味",'1041','10','8,3,4','19'],

]

// const dao = new DAO('mongodb://localhost:27017/', 'test', 'user')
//这个test2的user2是放课程id+课程名+上课时间的
const dao = new DAO('mongodb://localhost:27017/', 'test2', 'user2')

// const dao = new DAO('mongodb://localhost:27017/', 'test2', 'user3')


// let obj={course_id:'82536',name:'外国工艺美术史'}

// let obj = { name: "xushilin", age: '20' }

// let obj = { name: "qwe", age: '22' }
// dao.insert(obj).then((res) => console.log(res))


// 批量建立数据库
// let arr=[]
// for (let i = 0; i < database.length; i++) {
//     arr.push({
//         coures_id:database[i][0]  ,
//         name: database[i][1],
//         course_time:database[i][2],
//         course_points:database[i][3],
//         teacher_id:database[i][4],
//         student_nums:database[i][5],
//         course_ablity:database[i][6],
//         student_id:database[i][7],
//     })
// }

//test2 user3的一些测试
// for (let i = 0; i < 4; i++) {
//     arr.push({
//         id: i.toString(),
//         name: 'nn',
        
//     })
// }
// dao.insert(arr, true).then((res) => console.log(res))

//删除操作

// let obj={course_id:'82536'}
// dao.del(obj,true).then(res=>{console.log(res)})

//改操作
// let obj={coures_id:'82535',course_ablity:"['建筑史建筑背景','现代建筑发展','唐代建筑史','宋代建筑史','清代建筑史']"}
// let upd={course_id:'82535',course_ablity:"建筑史建筑背景,现代建筑发展,唐代建筑史,宋代建筑史,清代建筑史"}
let obj={coures_id:'82542',course_points:"创业框架,客户需求,市场分析"}
let upd={course_id:'82542',course_points:"煤炭检验、煤炭洗选检测、焦炭检验"}
// let obj={coures_id:'82542',name:"党的十九大精神概论"}
// let upd={course_id:'82542',name:"煤质分析及煤化工产品检验"}
dao.update(obj,upd).then((res)=>console.log(res))

// //查询
// dao.query().then((arr) => { console.log(arr) })