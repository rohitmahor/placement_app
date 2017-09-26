
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var obj="";

function connectDB(run_server) {
    mongoClient.connect(url, function(err, db) {
        console.log("Database connection established");
        run_server();
        obj=db;
    });
}

var insertDocuments = function(collection,data,callback) {
    // Get the documents collection
    console.log(obj);
  obj.collection(collection).insertOne(data, function(err, result) {
        console.log("Insert Data");
        callback(result);
    });
};

var findDoc = function(collection,data1,callback) {
    if(data1 === null) {
        obj.collection(collection).find({}).toArray(function(err,result){
            if(err) throw err;
            callback(err,result);
        });
    }

    else if(data1 !== null) {
        obj.collection(collection).find(data1).toArray(function(err,result){
            if(err) throw err;
            callback(err,result);
        });
    }

};

var updateDoc = function(collection,data1,data2,callback) {
    obj.collection(collection).updateMany(data1,{$set:data2},function(err,result){
        if(err) throw err;
        callback(err,result);
    })
};


var push = function(collection,data1,data2,callback){
    obj.collection(collection).updateOne(data1,{$push:data2},function(err,result){
        if(err) throw err;
        callback(result);
    })
}

var marks = function(collection,data1,data2,callback){
    obj.collection(collection).find(data1,data2).toArray(function(err,result){
        if(err) throw err;
        callback(result);
    })
};
module.exports = {
    connectDB:connectDB,
    insert:insertDocuments,
    findDoc:findDoc,
    update:updateDoc,
    push:push,
    marks:marks
};
