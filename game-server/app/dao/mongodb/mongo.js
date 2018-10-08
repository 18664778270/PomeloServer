const MongoClient = require('mongodb').MongoClient
let DatabaseApi = require("./databaseApi")

class MG{
	constructor(app){
		this.app = app
		let mongoConfig = app.get('mongodb');
		let url = "mongodb://" + mongoConfig.host + ":" + mongoConfig.port
		let options = {
			auth:{
				user:mongoConfig.username,
				password:mongoConfig.password,
			},
			poolSize:mongoConfig.maxConnes,
			useNewUrlParser:true
		}
		let mongoClient = new MongoClient(url,options);
		mongoClient.connect((err, client) => {
			if (err){
				PMLogger.error(__filename,'mongoClient connect failed!',err);
				return
			}
			this.mongodb = this.getDatabase(mongoConfig.dbName)
		});
		this.mongodb_client = mongoClient
	}

	_setDBProxy(db){
		let dbApi = new DatabaseApi()
		dbApi.setProxy(db)
		return dbApi
	}

	shutdown(){
		this.mongodb_client.close()
	}

	getDefaultDatabase(){
		return this.mongodb
	}
	/**
	 * 
	 * @param {string} dbName The name of the database
	 * @param {object} options Optional settings.
	 * @param {boolean} [options.noListener=false] Do not make the db an event listener to the original connection.
 	 * @param {boolean} [options.returnNonCachedInstance=false] Control if you want to return a cached instance or have a new one created
 	 * @return {Db}
	 */
	getDatabase(dbName,options){
		let db = this.mongodb_client.db(dbName, options)
		db = this._setDBProxy(db)
		return db
	}

	
}

module.exports = MG