function (hashId, keyString, keyCode, e) {
        var toExecute;
        for (var i = this.$handlers.length; i--;) {
            toExecute = this.$handlers[i].handleKeyboard(
                this.$data, hashId, keyString, keyCode, e
            );
            if (toExecute && toExecute.command)
                break;
        }

        if (!toExecute || !toExecute.command)
            return false;

        var success = false;
        var commands = this.$editor.commands;

        // allow keyboardHandler to consume keys
        if (toExecute.command != "null")
            success = commands.exec(toExecute.command, this.$editor, toExecute.args, e);
        else
            success = toExecute.passEvent != true;

        // do not stop input events to not break repeating
        if (success && e && hashId != -1)
            event.stopEvent(e);

        return success;
    }