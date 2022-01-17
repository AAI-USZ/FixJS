function(context, command)
    {
        var expr = command ? command : this.getCommandLine(context).value;
        if (expr == "")
            return;

        var mozJSEnabled = Firebug.Options.getPref("javascript", "enabled");
        if (!mozJSEnabled)
        {
            Firebug.Console.log(Locale.$STR("console.JSDisabledInFirefoxPrefs"), context, "info");
            return;
        }

        if (!Firebug.commandEditor || context.panelName != "console")
        {
            this.clear(context);
            Firebug.Console.log(commandPrefix + " " + expr, context, "command", FirebugReps.Text);
        }
        else
        {
            var shortExpr = Str.cropString(Str.stripNewLines(expr), 100);
            Firebug.Console.log(commandPrefix + " " + shortExpr, context, "command",
                FirebugReps.Text);
        }

        this.commandHistory.appendToHistory(expr);

        var noscript = getNoScript();
        if (noscript)
        {
            var currentURI = Firefox.getCurrentURI();
            var noScriptURI = currentURI ? noscript.getSite(currentURI.spec) : null;
            if (noScriptURI)
                noScriptURI = (noscript.jsEnabled || noscript.isJSEnabled(noScriptURI)) ?
                    null : noScriptURI;
        }

        if (noscript && noScriptURI)
            noscript.setJSEnabled(noScriptURI, true);

        var goodOrBad = Obj.bind(Firebug.Console.log, Firebug.Console);
        this.evaluate(expr, context, null, null, goodOrBad, goodOrBad);

        if (noscript && noScriptURI)
            noscript.setJSEnabled(noScriptURI, false);
    }