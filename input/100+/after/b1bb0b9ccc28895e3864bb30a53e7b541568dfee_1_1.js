function(command, editor, args) {
        if (typeof command === 'string')
            command = this.commands[command];

        if (!command)
            return false;

        if (editor && editor.$readOnly && !command.readOnly)
            return false;

        var retvalue = this._emit("exec", {
            editor: editor,
            command: command,
            args: args
        });

        return retvalue === false ? false : true;
    }