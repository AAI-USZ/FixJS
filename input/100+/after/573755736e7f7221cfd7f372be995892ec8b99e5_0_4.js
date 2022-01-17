function (data) {
    var self = this;

    if (self.hasQuit)
        return;

    data = data.toString('utf-8').trim();
    // Don't want to include passwords in logs.
    self._logIf(2, "FTP command: " + data.toString('utf-8').replace(/^PASS\s+.*/, 'PASS ***'), self);

    var command, arg;
    var index = data.indexOf(" ");
    if (index > 0) {
        command = data.substring(0, index).trim().toUpperCase();
        commandArg = data.substring(index+1, data.length).trim();
    } else {
        command = data.trim().toUpperCase();
        commandArg = '';
    }

    var m = '_command_' + command;
    if (self[m]) {
        self[m](commandArg, command);
    }
    else if (NOT_SUPPORTED[command]) {
        wwenc(self.socket, "202 Not supported\r\n");
    }
    else {
        wwenc(self.socket, "202 Not recognized\r\n");
    }
}