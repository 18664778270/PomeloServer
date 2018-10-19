let chatRemote = require('../remote/chatRemote');

module.exports = function(app) {
	return new Handler(app);
};

class Handler{
	constructor(app){
		this.app = app;
	}
/**
 * Send messages to users
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param  {Function} next next stemp callback
 *
 */
	send(msg,session,next){
		let rid = session.get('rid');
		let username = session.uid.split('*')[0];
		let channelService = this.app.get('channelService');
		let param = {
			msg: msg.content,
			from: username,
			target: msg.target
		};
		channel = channelService.getChannel(rid, false);

		//the target is all users
		if(msg.target == '*') {
			channel.pushMessage('onChat', param);
		}
		//the target is specific user
		else {
			let tuid = msg.target + '*' + rid;
			let tsid = channel.getMember(tuid)['sid'];
			channelService.pushMessageByUids('onChat', param, [{
				uid: tuid,
				sid: tsid
			}]);
		}
		next(null, {
			route: msg.route
		});
	}
}

Object.defineProperties(Handler.prototype, {
    send: {
        enumerable: true
    }
});