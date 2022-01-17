function () { /* Naming Global Scope */
    global = this;

    /* Functions to write less code */
    jsf = function (source, name) { /* Javascript File Name */
        return source + "script_" + name + ".js";
    }

    jsonf = function (source, name) { /* JSON File Name */
        return source + "script_" + name + ".json";
    }

    /* Functions to download files */
    dljs = function (resp, filename) {
        var fname = jsf("", filename);
        sys.writeToFile(fname, resp);
        if (sys.getFileContent(fname) === undefined) {
            print(filename + ": could not be installed.");
        }
        else {
            print("Installed " + filename + " script.");
            eval(sys.getFileContent(fname));
        }
    }

    dljson = function (resp, filename, object, key) {
        var fname = jsonf("", filename);
        sys.writeToFile(fname, resp);
        if (sys.getFileContent(fname) === undefined) {
            print(filename + ": default settings could not be installed.");
        }
        else {
            global[object][key] = JSON.parse(sys.getFileContent(fname));
            print("Installed " + filename + " default settings.");
        }
    }

    dlconstruction = function (resp) {
        var file = jsonf("", "construction");
        sys.writeToFile(file, resp);
        if (sys.getFileContent(file) === undefined) {
            print(filename + ": default settings could not be installed.");
        }
        else {
            construction = JSON.parse(sys.getFileContent(file));
            construct();
            print("Installed construction default settings.");
        }
    }

    /* Script Update Check Function */
    updatecheck = function (resp, startup) {
        var current_script = sys.getFileContent("scripts.js");
        if (construction.auto_update === "on" && /download/i.test(resp)) {
            if (current_script !== resp) {
                sys.writeToFile("scripts (last).js", current_script);
                sys.writeToFile("scripts.js", resp);
                if (startup) {
                    sys.changeScript(resp, true);
                }
                else {
                    sys.changeScript(resp);
                }
                print("Script Updated!");
                return;
            }
            print("Script is up-to-date.");
        }
    }

    /* Function to Load External JavaScript Files */
    install = function (source, filename) {
        var sname = jsf(source, filename),
            fname = jsf("", filename);

        if (sys.getFileContent(fname) === undefined || construction.auto_update === "on") {
            sys.webCall(sname, dljs(resp, file));
        }
        else {
            print("Loaded " + filename + " script.");
            eval(sys.getFileContent(fname));
        }
    }

    /* Function to Load External JSON Files */
    set = function (source, filename, object, key) {
        var sname = jsonf(source, filename),
            fname = jsonf("", filename);
        if (sys.getFileContent(fname) === undefined) {
            sys.webCall(sname, dljson(resp, filename, object, key));
        }
        else {
            try {
                global[object][key] = JSON.parse(sys.getFileContent(fname));
            }
            catch (error) {
                sys.writeToFile("script_" + filename + " (corrupted).json", sys.getFileContent(fname));
                print(filename + " file corrupted - downloading latest file...");
                sys.webCall(sname, dljson(resp, filename, object, key));
                return;
            }
            print("Loaded " + filename + " settings.");
        }
    }

    /* Function for Command Execution in an Object*/
    commandtry = function (object, src, channel, command) {
        validcommand = true;
        if (global[object].commands[command[0].toLowerCase()] != undefined) {
            command[0] += "*" + command[1];
            command.splice(1, 1);
        }
        command = command.join(' ').split('*');
        if (global[object].commands[command[0].toLowerCase()] === undefined) {
            validcommand = false;
            return;
        }
        try {
            global[object].commands[command[0].toLowerCase()](src, channel, command);
        }
        catch (error) {
            commanderror(src, "Sorry, the command " + escapehtml(command) + " is currently not available.", channel);
            print("Error: The command " + command + " could not be run: " + error);
        }

        commandused = true;
    }

    /* Command Error Message Function */
    commanderror = function (id, text, channel) {
        var display = "<timestamp/><table width='100%' style='background-color:qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0.1 black, stop:0.5 grey); color:white;'><tr><th>Personal Message</th></tr><tr><td><center><b><big>" + text + "</big></b></center></td></tr></table>";
        if (channel > -1) {
            sys.sendHtmlMessage(id, display, channel);
        }
        else {
            sys.sendHtmlMessage(id, display);
        }
    }

    /* Command Display Message Function */
    commanddisplay = function (id, header, body, channel) {
        var display = "<timestamp/><table width='100%'; style='background-color:qlineargradient(x1:0, y1:0, x2:0, y2:0.25, stop:0.1 mediumorchid stop:0.5 papayawhip);' color:'black;'>" + "<tr><td><center><h2><u><font color='black'>" + header + "</font></u></h2></center></td></tr>" + body + "</table>";

        if (channel > -1) {
            sys.sendHtmlMessage(id, display, channel);
        }
        else {
            sys.sendHtmlMessage(id, display);
        }
    }

    /* Escape Html Function */
    escapehtml = function (str) {
        return str.replace(/&/g, '&amp;').replace(/\>/g, '&gt;').replace(/\</g, '&lt;');
    }

    /* Remove Spaces Function */
    removespaces = function (str) {
        return str.split(' ').join('');
    }

    /* Loading External JavaScript Files */
    construction = {};
    construct = function () {
        var index;
        for (index in construction.units) {
            install(construction.source, construction.units[index]);
        }
    }


    var sname = jsonf("http://pokemonperfect.co.uk/", "construction"),
        fname = jsonf("", "construction");

    if (sys.getFileContent(fname) === undefined) {
        sys.webCall(sname, dlconstruction(resp));
    }
    else {
        try {
            construction = JSON.parse(sys.getFileContent(fname));
        }
        catch (error) {
            sys.writeToFile("script_construction (corrupted).json", sys.getFileContent(fname));
            print("Construction file corrupted - downloading latest file...");
            sys.webCall(sname, dlconstruction(resp));
            return;
        }
        if (construction.auto_update === "on") {
            sys.webCall(jsonf(construction.source, "construction"), dlconstruction(resp));
        }
        else {
            construct();
            print("Loaded construction settings.");
        }
    }

    delete sname, fname; /* Remove these variables from the global scope */

    /* Base Commands */
    typecommands = "<center><b><font color='orangered'>The following commands need to be entered into a channel's main chat:</font></b></center>";
    commands = {
        commands: function (src, channel, command) {
            var index, display = typecommands;
            for (index in construction.units) {
                display += "<tr><td><center><font color='darkgreen'><b>/" + construction.units[index] + "commands</b></font>: displays the " + construction.units[index] + "commands.</center></td></tr>";
            }
            commanddisplay(src, "Commands", display, channel);
        }
    } /* Script Reload Message */
    if (global.auth !== undefined) {
        auth.echo("server", "The Script has been reloaded!", -1);
    }
}