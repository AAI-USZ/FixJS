function()
    {
        var cred = this.getSelected();
        if (!cred) return;
        if (!confirm("Delete credentials " + cred.name)) return;
        this.core.removeCredentials(cred)
        this.invalidate();
    }