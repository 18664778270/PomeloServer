module.exports = function(app) {
return new Handler(app);
};

var Handler = function(app) {
this.app = app;
};

/**
 * 
 * @param {*} err 
 * @param {*} msg 
 * @param {*} resp 
 * @param {*} session 
 * @param {*} cb cb的签名为cb(err, resp),cb会将resp发送给客户端
 */
Handler.prototype.onErrorHandler = function(err, msg, resp, session, cb) {
    console.error("Error:"+err);
    cb(err, resp);
};