function Credential(name, accessKey, secretKey, url, securityToken, expire)
{
    this.name = name;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.url = typeof url == "string" ? url : "";
    this.securityToken = typeof securityToken == "string" ? securityToken : "";
    this.status = "";
    this.expire = expire || 0;
    this.type = this.expire ? " Temporary" : "";
    this.expirationDate =  this.expire ? new Date(parseInt(this.expire)) : "";


    this.toString = function() {
        return this.accessKey + ";;" + this.secretKey + ";;" + this.url + ";;" + this.securityToken + ";;" + this.expire;
    }
}