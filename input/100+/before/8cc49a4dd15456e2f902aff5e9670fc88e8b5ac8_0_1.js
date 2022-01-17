function () {
    "use strict";

    var express = require("express"),
        fluid = require("infusion"),
        child_process = require("child_process"),
        gpii = fluid.registerNamespace("gpii");
        
    fluid.registerNamespace("gpii.launch");
        
    fluid.defaults("gpii.launch.exec", {
        gradeNames: "fluid.function",
        argumentMap: {
            command: 0,
            options: 1
        }
    });
    
    gpii.launch.exec = child_process.exec;

    fluid.defaults("gpii.launch.spawn", {
        gradeNames: "fluid.function",
        argumentMap: {
            command: 0,
            args: 1, 
            options: 2
        }
    });
    
    gpii.launch.spawn = child_process.spawn;

    fluid.defaults("gpii.launch.readWriteGold", {
        gradeNames: "fluid.function",
        argumentMap: {}
    });

    gpii.launch.readWriteGold = function () {
        var value = gpii.windows.readRegistryKey("HKEY_CURRENT_USER", "Software\\Texthelp\\Read&Write10", "InstallPath", "REG_SZ").value;
        value += "\\ReadAndWrite.exe";
        gpii.launch.exec(value);
    };
   
}