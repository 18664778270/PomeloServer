let ResultCode = require("../../../define/ResultCode")
let LoginProtocol = require("../../../define/ServerProtocol")
module.exports = function(app) {
    return new GateHandler(app);
};

class GateHandler {
    constructor(app){
        this.app = app;
    }
    
    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    queryEntry(){
        console.log(msg)
        var uid = msg.uid;
        if (!uid) {
            let event = new MsgEvent(LoginProtocol.resp.login_gete_resp,ResultCode.FAIL,{})
            next(null, event);
            return;
        }
    
        var connectors = this.app.getServersByType('connector');
        if (!connectors || connectors.length === 0) {
            let event = new MsgEvent(LoginProtocol.resp.login_gete_resp,ResultCode.FAIL,{})
            next(null, event);
            return;
        }
        var res = connectors[0]
        let event = new MsgEvent(LoginProtocol.resp.login_gete_resp,ResultCode.OK,{
            host: res.host,
            port: res.clientPort
        })
        next(null, event);
    }
}