let _logger
class logutil {
    error(filename,msg,err){
        if(!msg){
            msg = ""
        }
        let logger = require('pomelo-logger').getLogger(filename);
        logger.error("[ERROR] :" + msg + "(" + err.message + err.stack + ")")
    }
    info(msg,obj){
        if (!obj) {
            obj = ""
        }
        console.info("[INFO] :"+ "(" + msg + ")"+obj)
    }
}
if (!_logger) {
    _logger = new logutil()
}
global.PMLogger = _logger
