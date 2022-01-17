function(string)
    {
        var cookie = new Object();
        var pairs = string.split(";");

        for (var i=0; i<pairs.length; i++)
        {
            var pair = FBL.trim(pairs[i]);
            var option = pair.split("=");
            if (i == 0)
            {
                cookie.name = option[0];
                cookie.value = option[1];
            } 
            else
            {
                var name = option[0].toLowerCase();
                if (name == "httponly")
                {
                    cookie.httpOnly = true;
                }
                else if (name == "expires")
                {
                    var value = option[1];
                    value = value.replace(/-/g, " ");
                    cookie[name] = dateToJSON(new Date(value.replace(/-/g, " ")));
                }
                else if (name == "secure")
                {
                    cookie.secure = true;
                }
                else
                {
                    cookie[name] = option[1];
                }
            }
        }
        
        return cookie;
    }