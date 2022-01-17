function()
    {
        var name = this.nameNode.value;
        if (!name)
        {
            alert(Firebug.CookieModule.$FC_STR("firecookie.edit.invalidname"));
            return false;
        }

        var domain = this.domainNode.value;
        if (!this.checkHost(domain))
        {
            alert(Firebug.CookieModule.$FC_STR("firecookie.edit.invalidhost"));
            return false;
        }

        var path = this.pathNode.value;
        if (!this.checkPath(domain, path))
        {
            alert(Firebug.CookieModule.$FC_STR("firecookie.edit.invalidpath"));
            return false;
        }

        return true;
    }