function(msg, scope){
        return def.error(
                   def.string.join(" ", 
                       "Assertion failed.", 
                       def.format(msg, scope)));
    }