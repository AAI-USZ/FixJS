function()
    {
        var name = this.nameNode.value;
        if (!name)
        {
            prompts.alert(this.window, Locale.$STR("Firebug"),
                Locale.$STR("cookies.edit.invalidname"));
            return false;
        }

        var domain = this.domainNode.value;
        if (!this.checkHost(domain))
        {
            prompts.alert(this.window, Locale.$STR("Firebug"),
                Locale.$STR("cookies.edit.invalidhost"));
            return false;
        }

        var path = this.pathNode.value;
        if (!this.checkPath(domain, path))
        {
            prompts.alert(this.window, Locale.$STR("Firebug"),
                Locale.$STR("cookies.edit.invalidpath"));
            return false;
        }

        return true;
    }