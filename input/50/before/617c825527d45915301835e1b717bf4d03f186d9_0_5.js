function(msg, scope){
        return def.error(
                   def.join(" ", 
                       "Assertion failed.", 
                       def.format(msg, scope)));
    }