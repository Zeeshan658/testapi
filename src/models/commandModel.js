"use strict";
let Parameters = require("./parametersmodel");
let _cmdText = new WeakMap();
let _cmdType = new WeakMap();
class Command {
    constructor(cmdText, cmdType) {
        _cmdText.set(this, cmdText);
        _cmdType.set(this, cmdType);
        this.parameters = new Parameters();
    }

    get cmdText() {
        return _cmdText.get(this);
    }
    set cmdText(value){
        _cmdText.set(this, value);
    }

    get cmdType(){
        return _cmdType.get(this);
    }
    set cmdType(value){
        _cmdType.set(this, value);
    }
}
module.exports = Command;
