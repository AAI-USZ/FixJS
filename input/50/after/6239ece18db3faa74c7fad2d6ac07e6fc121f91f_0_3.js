function(msg, scope){
        return def.error(def.string.join(" ", "Invalid operation.", def.format(msg, scope)));
    }