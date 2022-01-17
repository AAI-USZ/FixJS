function _lambda(name, args, body) {
                return [ this[0], name, args, tighten(body, "lambda") ];
        }