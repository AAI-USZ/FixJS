function notifyFirebug(objs, methodName, eventID)
    {
        var event = contentView.document.createEvent("Events");
        event.initEvent(eventID, true, false);

        commandLine.userObjects = [];
        for (var i=0; i<objs.length; i++)
            commandLine.userObjects.push(objs[i]);

        var length = commandLine.userObjects.length;
        contentView.document.setUserData("firebug-methodName", methodName, null);

        contentView.document.dispatchEvent(event);

        if (FBTrace.DBG_COMMANDLINE)
            FBTrace.sysout("commandLine.Exposed; dispatched event "+methodName+" via "+
                eventID+" with "+objs.length+ " user objects, [0]:"+commandLine.userObjects[0]);

        var result;
        if (contentView.document.getUserData("firebug-retValueType") == "array")
            result = [];

        if (!result && commandLine.userObjects.length == length+1)
            return commandLine.userObjects[length];

        for (var i=length; i<commandLine.userObjects.length && result; i++)
            result.push(commandLine.userObjects[i]);

        return result;
    }