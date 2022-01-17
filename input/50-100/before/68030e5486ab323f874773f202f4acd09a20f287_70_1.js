function (require, exports, module) {
    'use strict';

    // Load dependent modules
    var CommandManager     = require("command/CommandManager");

    /**
     * The native function BracketsShellAPI::DispatchBracketsJSCommand calls this function in order to enable
     * calling Brackets commands from the native shell.
     */
    function executeCommand(eventName) {
        var evt = window.document.createEvent("Event");
        evt.initEvent(eventName, false, true);
        
        CommandManager.execute(eventName, {evt: evt});
        
        //return if default was prevented
        return evt.defaultPrevented;
    }

    exports.executeCommand = executeCommand;
}