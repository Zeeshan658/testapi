'use strict';
class Parameters extends Array {
    constructor() {
        super();
    }
}
Parameters.prototype.addWithValue = function (name, value) {
    this.push({
        name: name,
        val: value
    });
}
module.exports = Parameters;