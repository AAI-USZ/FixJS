function(req, res) {
        // TODO handle errors
        var params = JSON.parse(req.post),
            width = params.width,
            height = params.height;

        if(typeof(params.width) !== "number" || typeof(params.height) !== "number") {
            throw _errors.createInvalidReqMissingCommandParameterEH(req);
        }

        _session.getCurrentWindow().viewportSize = {width:width, height:height}
        res.success(_session.getId());
    }