function(string)
    {
        var cookie = new Object();
        var pairs = string.split("; ");

        for (var i=0; i<pairs.length; i++)
        {
            var option = pairs[i].split("=");
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
                else
                {
                    cookie[name] = option[1];
                }
            }
        }
        
        return cookie;
    }