class DatabaseApi {
    setProxy(db){
        this.db = db
	}
	
	/**
	 * 
	 * @param {string} collectionName 
	 */
	createCollection(collectionName){
		this.db .createCollection(collectionName, function (err, res) {
        if (err){
			PMLogger.error(__filename,'mongodb createCollection failed !',err);
			throw err;
		} 
        PMLogger.info("create collection success !",res)
    });
	}

    /**
	 * 
	 * @param {string} collectionName 
	 * @param {object} data 
	 * @param {function} callback 
	 */
	insertOne(collectionName,data,callback){
		this.db.collection(collectionName).insertOne(data,(err, res) => {
			if(err){
				PMLogger.error(__filename,'mongodb insertOne failed !',err);
				return
			}
			if(callback){
				PMLogger.info("insertOne data success !",res)
				PMUtils.invokeCallback(callback,res)
			}
		})
	}

	/**
	 * 
	 * @param {string} collectionName 
	 * @param {object} data 
	 * @param {function} callback 
	 */
	insertMany(collectionName,data,callback){
		this.db.collection(collectionName).insertMany(data,(err, res) => {
			if(err){
				PMLogger.error(__filename,'mongodb insertOne failed !',err);
				throw err
			}
			if(callback){
				PMLogger.info("insertMany data success !",res)
				PMUtils.invokeCallback(callback,res)
			}
		})
	}

	/**
	 * 
	 * @param {string} collectionName 
	 * @param {object} query 
	 * @param {function} callback 
	 */
	findWithCallback(collectionName,query,callback){
		this.db.collection(collectionName).find(query).toArray((err, result) => {
			if (err) {
				PMLogger.error(__filename,'mongodb find failed !',err);
				throw err;
			}
			
			if(callback){
				PMLogger.info("find data success !",res)
				PMUtils.invokeCallback(callback,result)
			}
		});
	}

	/**
	 * 
	 * @param {string} collectionName 
	 * @param {object} query 
	 * @returns {object} cursor 返回光标对象
	 */
	find(collectionName,query){
		return this.db.collection(collectionName).find(query)
	}

	/**
	 * 
	 * @param {string} collectionName
	 * @param {object} query {category："new"}
	 * @param {object} update {$set：{categor："old"}}
	 * @param {boolean} upsert 如果为查询到是否插入文档
	 * @param {boolean} multi 是否更新多条
	 */
	update(collectionName,query, update, upsert, multi){
		this.db.collection(collectionName).update(query,update,upsert, multi)
	}
}

module.exports = DatabaseApi