module.exports = function(app) {
    return new Handler(app);
};

class Handler {
    constructor(app){
        this.app = app;
    }
    
    /**
     * 
     * @param {*} err 
     * @param {*} msg 
     * @param {*} resp 
     * @param {*} session 
     * @param {*} cb cb的签名为cb(err, resp),cb会将resp发送给客户端
     */
    onErrorHandler(err, msg, resp, session, cb){
        console.error("Error:"+err);
        cb(err, resp);
    }
}