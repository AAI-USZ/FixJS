function(data, empty_infinity)
    {
        if (data == -1 || !data)
            return "\u221E"
        
        var secs = Number(data)
        
        if(secs > 63072000)
            return empty_infinity ? '' : "\u221E"
        
        var div, y, w, d, h, m, s, output = ""
        
        y = Math.floor(secs / 31536000)
        div = secs % 31536000
        w = Math.floor(div / 604800)
        div = div % 604800
        d = Math.floor(div / 86400)
        div = div % 86400
        h = Math.floor(div / 3600)
        div = div % 3600
        m = Math.floor(div / 60)
        s = div % 60
        
        if (y > 0)
        {
            output = "%dy %dw".replace(/%d/, y).replace(/%d/, w)
        }else if(w > 0){
            output = "%dw %dd".replace(/%d/, w).replace(/%d/, d)
        }else if(d > 0){
            output = "%dd %dh".replace(/%d/, d).replace(/%d/, h)
        }else if(h > 0){
            output = "%dh %dm".replace(/%d/, h).replace(/%d/, m)
        }else if(m > 0){
            output = "%dm %ds".replace(/%d/, m).replace(/%d/, s)
        }else{
            output = "%ds".replace(/%d/, s)
        }
        return output
    }