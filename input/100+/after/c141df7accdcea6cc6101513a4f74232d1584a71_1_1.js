function(req, res, next) {
    if(req.method === 'inspect') {
        //Service inspection

        if(req.args.length !== 1 || typeof(req.args[0]) !== 'string') {
            var error = stack.createSyntheticError("BadArgumentsError", "Bad arguments");
            res.update(error, undefined, false);
        } else {
            req.service = req.args[0];
            req.method = '_zerorpc_inspect';
            req.args = [];
        }
    } else if(req.method === 'services') {
        //Service listing
        req.service = 'registrar';
        req.method = 'services';
    } else {
        //Unknown built-in
        var error = model.createSyntheticError("BadMethodError", "Unknown method");
        res.update(error, undefined, false);
    }

    next();
}