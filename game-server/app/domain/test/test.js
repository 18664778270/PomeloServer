let EventEmitter = require("events").EventEmitter

class Test extends EventEmitter {
    constructor(){
        super()
    }
    save(){
        this.emit("save")
    }
    onSave(){
        this.on("save",()=>{
            PMLogger.info("save success")
        })
    }
}

module.exports = Test