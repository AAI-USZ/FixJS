function(msg, scope){
        return def.error(def.join(" ", "Invalid operation.", def.format(msg, scope)));
    }