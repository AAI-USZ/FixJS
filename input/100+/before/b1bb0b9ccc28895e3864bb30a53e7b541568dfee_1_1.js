function(command, editor, args) {
        if (typeof command === 'string')
            command = this.commands[command];

        if (!command)
            return false;

        if (editor && editor.$readOnly && !command.readOnly)
            return false;

        try {
            var retvalue = this._emit("exec", {
                editor: editor,
                command: command,
                args: args
            });
        } catch (e) {
            window.console && window.console.log(e);
            return true;
        }

        return retvalue === false ? false : true;
    }