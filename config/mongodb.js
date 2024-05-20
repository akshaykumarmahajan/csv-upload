const {MongoClient} = require('mongodb');
const url = process.env.DATABASEURL || "mongodb://localhost:27017";
const dbName = "upload-csv";

module.exports = {
    find: async function(collection_name, query_param){
        const client = new MongoClient(url);
        const db = client.db(dbName);
        await client.connect();
        const collection = db.collection(collection_name);

        const query = query_param
        const result = await collection.deleteOne(query);

        await client.close();
        return result

    },
    deleteOne: async function(collection_name, query_param){
        const client = new MongoClient(url);
        const db = client.db(dbName);
        let deleteStatus = false;
        await client.connect();
        const collection = db.collection(collection_name);

        const query = query_param
        const options = {}

        const result = await collection.deleteOne(query);
        if(result.deletedCount == 1){
            deleteStatus = true
        }else{
            deleteStatus = false
        }
        await client.close();
        return deleteStatus

    },
    deleteMany: async function(collection_name, query_param){
        const client = new MongoClient(url);
        const db = client.db(dbName);
        let deleteStatus = false;
        await client.connect();
        const collection = db.collection(collection_name);

        const query = query_param
        const options = {}

        const result = await collection.deleteMany(query);
        if(result.acknowledged){
            deleteStatus = true
        }else{
            deleteStatus = false
        }
        await client.close();
        return deleteStatus
    },
    update: async function(collection_name, query, update, options){
        const client = new MongoClient(url);
        const db = client.db(dbName);
        let updateStatus = false;
        await client.connect();
        const collection = db.collection(collection_name);
        const updateDetails = {$set: update};

        const result = await collection.updateOne(query,updateDetails,options);
        if(result.acknowledged){
            updateStatus = true
        }else{
            updateStatus = false
        }
        await client.close();
        return updateStatus
    },
    insert: async function(collection_name, payload){
        const client = new MongoClient(url);
        const db = client.db(dbName);
        let insertStatus = false;
        await client.connect();
        const collection = db.collection(collection_name);
        const result = await collection.insertOne(payload);
        if(result.acknowledged){
            insertStatus = true
        }else{
            insertStatus = false
        }
        await client.close();
        return insertStatus
    }
}