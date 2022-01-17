function(require, exports, module) {
"use strict";

var assert = require("../test/assertions");
var JavaScriptWorker = require("./javascript_worker").JavaScriptWorker;


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

    "test check for syntax error": function() {
        var worker = new JavaScriptWorker(this.sender);
        worker.setValue("Juhu Kinners");
        worker.deferredUpdate.call();

        var error = this.sender.events[0][1];
        assert.equal(error.text, "missing ; before statement");
        assert.equal(error.type, "error");
        assert.equal(error.row, 0);
        assert.equal(error.column, null);
    },

    "test invalid multi line string": function() {
        var worker = new JavaScriptWorker(this.sender);
        worker.setValue('"a\n\\nn"');
        worker.deferredUpdate.call();

        var error = this.sender.events[0][1];
        assert.equal(error.text, "Unterminated string literal");
        assert.equal(error.type, "error");
        assert.equal(error.row, 0);
        assert.equal(error.column, null);
    },

    "test check for narcissus bug": function() {
        var worker = new JavaScriptWorker(this.sender);
        worker.setValue("if('");
        worker.deferredUpdate.call();
        assert.equal(this.sender.events[0][1].type, "error");
    }
};

}