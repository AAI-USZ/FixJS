function(require, exports, module) {
"use strict";

var assert = require("../test/assertions");
var Worker = require("./json_worker").JsonWorker;


module.exports = {
    setUp : function() {
        this.sender = {
            on: function() {},
            callback: function(data, id) {
                this.data = data;
            },
            events: [],
            emit: function(type, e) {
                this.events.push([type, e]);
            }
        };
    },

    "test check valid json": function() {
        var worker = new Worker(this.sender);
        worker.setValue("{}");
        worker.deferredUpdate.call();

        assert.equal(this.sender.events[0][0], "ok");
    },

    "test check for syntax error": function() {
        var worker = new Worker(this.sender);
        worker.setValue([
            "{",
            "juhu: 12",
            "}"
        ].join("\n"));
        worker.deferredUpdate.call();

        var event = this.sender.events[0];
        assert.equal(event[0], "error");
        assert.equal(event[1].type, "error");
        assert.equal(event[1].text, "Bad string");
        assert.equal(event[1].row, 1);
        assert.equal(event[1].column, 0);

    },

    "test check for syntax error at first char": function() {
        var worker = new Worker(this.sender);
        worker.setValue("x");
        worker.deferredUpdate.call();

        var event = this.sender.events[0];
        assert.equal(event[0], "error");
        assert.equal(event[1].type, "error");
        assert.equal(event[1].text, "Unexpected 'x'");
        assert.equal(event[1].row, 0);
        assert.equal(event[1].column, 0);
    }

};

}