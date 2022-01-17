function(){
        
        var t, cookie = '{';
        cookie += '"s":"'+navigator.userAgent+'"';
        if(t = this.getOS())
            cookie += ',"os":"'+t+'"';
        if(t = this.getOSVersion())
            cookie += ',"osv":"'+t+'"';
        if(t = this.getBrowser())
            cookie += ',"b":"'+t+'"';
        if(t = this.getBrowserEngine())
            cookie += ',"be":"'+t+'"';
        if(t = this.getBrowserEngineVersion())
            cookie += ',"bev":"'+t+'"';
        cookie += '}';
        
        return cookie;
        
    }