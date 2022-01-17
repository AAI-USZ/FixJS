function QueryString(obj){
        var args = arguments, args_callee = args.callee, args_length = args.length,
            i, querystring = this;

        if (!(this instanceof args_callee)) {
            return new args_callee(obj);
        }

        if (obj != undefined) {
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    querystring[i] = obj[i];
                }
            }
        }

        querystring.skipQueryEncode = false;

        return querystring;
    }