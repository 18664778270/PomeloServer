let path = require("path")
let MG_path = path.resolve("./app/dao/mongodb/mongo")
let MG = require(MG_path)
class mongodb_client{
    constructor(app,opts){
        this.name = "__mongodb_client__"
        this.app = app
    }
    start(cb){
        PMLogger.info("mongodb_client star !")
        process.nextTick(cb);
    }
    afterStart(cb){
        PMLogger.info("mongodb_client afterStart !")
        this.init()
        process.nextTick(cb);
    }
    stop(cb){
        PMLogger.info("mongodb_client stop !")
        this.mongodbclient.shutdown()
        process.nextTick(cb);
    }
    init(){
        if (!this.mongodbclient){
            this.mongodbclient = new MG(this.app)
        }
        this.app.set('dbclient', this.mongodbclient);
    }
}

module.exports = function(app,opts){
    return new mongodb_client(app,opts)
}