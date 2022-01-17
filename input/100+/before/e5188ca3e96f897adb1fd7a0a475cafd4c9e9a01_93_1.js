function()
    {
        var expires = this.cookie.expires ? new Date(this.cookie.expires * 1000) : null;
        return this.cookie.host + "\t" +
            new String(this.cookie.isDomain).toUpperCase() + "\t" +
            this.cookie.path + "\t" +
            new String(this.cookie.isSecure).toUpperCase() + "\t" +
            (expires ? expires.toGMTString()+ "\t" : "") +
            this.cookie.name + "\t" +
            this.cookie.rawValue + "\r\n";
    }