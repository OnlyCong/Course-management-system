//文件夹中install mongodb
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
                db.collection(this.collectionName).update(obj, updatecpy).then((res) => {
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
    //分页查询
    queryByPage(currentPage, pageSize) {
        return new Promise((resolve, reject) => {
            this._connect().then(client => {
                let db = client.db(this.dbName)
                currentPage = parseInt(currentPage)
                pageSize = parseInt(pageSize)
                let querys = db.collection(this.collectionName).find().skip((currentPage - 1) * pageSize).limit(pageSize)
                querys.toArray((err, result) => {
                    if (err) {
                        throw (err)
                    }
                    resolve(result)
                })
            })
        })

    }
}


//暴露db的方法
module.exports = DAO
// let obj = { name: "xushilin", age: '20' }

// let obj = { name: "bibi", age: '22' }
// dao.insert(obj).then((res) => console.log(res))

// let arr = []
// for (let i = 0; i < 10; i++) {
//     arr.push({
//         userid: '妖怪' ,
//         age: i
//     })
// }
// dao.insert(arr, true).then((res) => console.log(res))

//删除操作
// let obj={userid:'妖怪'}
// dao.del(obj,true).then(res=>{console.log(res)})

//改操作
// let obj={name:'bibi'}
// let upd={name:'yena',age:'21'}
// dao.update(obj,upd).then((res)=>console.log(res))

//查询
// dao.query().then((arr) => { console.log(arr) })