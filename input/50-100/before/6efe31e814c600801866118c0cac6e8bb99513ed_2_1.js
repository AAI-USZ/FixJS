function(fn)
        {
            if(typeof fn == "function")
            {
                $('#up-button').removeAttr('href').unbind().click(function(){
                    fn();
                    return false;
                });
            }
            else if(typeof fn == "string")
            {
                $('#up-button').unbind().attr('href', fn);
            }
        }