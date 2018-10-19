module.exports = function (app) {
    return new EntryHandler(app);
}

// generate playerId
let id = 1;

class EntryHandler {
    constructor(app){
        this.app = app;
        this.serverId = app.get('serverId').split('-')[2];
    }

    /**
     * New client entry game server. Check token and bind user info into session.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next stemp callback
     * @return {Void}
     */
    entry(msg, session, next){
        let self = this;
        let sessionService = self.app.get('sessionService');
        let playerId = parseInt(this.serverId + id, 10);
        let uid = msg.uid + '*' + playerId
        id += 1;
      
        session.bind(uid);
        session.set('playerId', playerId);
        session.pushAll(function(err){
          if (err){
            console.error("session pushAll Error",err.stack)
          }
        });
      
        session.on('closed', onUserLeave.bind(null, self.app));
      
        // put user into channel
        self.app.rpc.chat.chatRemote.add(session, uid, this.serverId, "chatRoom", true, function(users){
        next(null, {
            users:users
        });
        });
      
        let event = new MsgEvent(LoginProtocol.resp.login_connector_resp,ResultCode.OK,{
          playerId: playerId
        })
        next(null,event);
    }

    /**
     * Publish route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    publish(msg, session, next){
        let result = {
            topic: 'publish',
            payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
        };
        next(null, result);
    }

    /**
     * Subscribe route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    subscribe(msg, session, next){
        let result = {
            topic: 'subscribe',
            payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
        };
        next(null, result);
    }
}

let onUserLeave = function(app, session) {
	if(!session || !session.uid) {
		return;
	}
	app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'),"chatRoom", null);
};