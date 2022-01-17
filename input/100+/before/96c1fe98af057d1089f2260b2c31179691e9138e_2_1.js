function (require, exports, module) {
    'use strict';
    
    var _commands = {};

    /**
     * Registers a global command.
     *
     * @param {string} id The ID of the command.
     * @param {function(...)} command The function to call when the command is executed. Any arguments passed to
     *     execute() (after the id) are passed as arguments to the function. If the function is asynchronous,
     *     it must return a jQuery promise that is resolved when the command completes. Otherwise, the
     *     CommandManager will assume it is synchronous, and return a promise that is already resolved.
     */
    function register(id, command) {
        if (_commands[id]) {
            throw new Error("Attempting to register an already-registered command: " + id);
        }
        if (!id || !command) {
            throw new Error("Attempting to register a command with a bad id or function");
        }
        _commands[id] = command;
    }

    /**
     * Runs a global command. Additional arguments are passed to the command.
     *
     * @param {string} id The ID of the command to run.
     * @return {$.Promise} a jQuery promise that will be resolved when the command completes.
     */
    function execute(id) {
        var command = _commands[id];
        if (command) {
            var result = command.apply(null, Array.prototype.slice.call(arguments, 1));
            if (!result) {
                return (new $.Deferred()).resolve().promise();
            } else {
                return result;
            }
        } else {
            return (new $.Deferred()).reject().promise();
        }
    }

    // Define public API
    exports.register = register;
    exports.execute = execute;
}