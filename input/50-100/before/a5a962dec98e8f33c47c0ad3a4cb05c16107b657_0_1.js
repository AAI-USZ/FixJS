function (accessKey, secretKey, securityToken)
    {
        this.errorCount = 0;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.securityToken = typeof securityToken == "string" ? securityToken : "";
        debug('setCreds: ' + this.accessKey + ", " + this.secretKey + ", " + this.securityToken)
    }