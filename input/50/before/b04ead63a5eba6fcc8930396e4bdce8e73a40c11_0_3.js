function(str, context){
                return str.replace(/\[([^\]]+)\]/, [context, ".$1"].join(""));
            }