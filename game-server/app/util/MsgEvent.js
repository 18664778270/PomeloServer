/**
 * @private
 */
let _code //返回码
let _data //返回数据

/**
 * @class 封装协议event对象
 * @param {*} msgId 协议号
 * @param {*} code  
 * @param {*} msgData 
 */
let MsgEvent = class MsgEvent{

    /** 
     * @constructor
    */
    constructor(msgId,code,msgData){
        this.msgId = msgId
        _code = code || -1
        _data = msgData || {}
        this.msg = new Array()
        this._init()
    }
    _init(){
        this.msg.push(_code)
        this.msg.push(_data)
    }
}

global.MsgEvent = MsgEvent

