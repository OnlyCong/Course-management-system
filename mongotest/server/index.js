
const MongoClient = require('mongodb').MongoClient

MongoClient.connect("mongodb://localhost:27017/",{useUnifiedTopology:true},(err,client)=>{
    //test是自己建的库的名字
    let db=client.db('test')
    //user是库里的表
    db.collection('user').insertOne({name:'xuxian',age:'20'})
    client.close()
})