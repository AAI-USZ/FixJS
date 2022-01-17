function()
    {
        return this.cookie.host + "\t" +
            new String(this.cookie.isDomain).toUpperCase() + "\t" +
            this.cookie.path + "\t" +
            new String(this.cookie.isSecure).toUpperCase() + "\t" +
            this.cookie.expires + "\t" +
            this.cookie.name + "\t" +
            this.cookie.rawValue + "\r\n";
    }