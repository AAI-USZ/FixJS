function(name, msg, scope){
        return def.error(
                   def.join(" ",
                       def.format("Invalid argument '{0}'.", [name]), 
                       def.format(msg, scope)));
    }