function(req, res) {
        // TODO handle errors
        var params = JSON.parse(req.post),
            width = params.width,
            height = params.height;

        if(!params.width || !params.height) {
            throw _errors.createInvalidReqMissingCommandParameterEH(req);
        }

        _session.getCurrentWindow().viewportSize = {width:width, height:height}
        res.success(_session.getId());
    }