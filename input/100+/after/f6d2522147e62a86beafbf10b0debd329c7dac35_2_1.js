function(req, res) {
    var options = (req.body && req.body.options) || {};

    // Request must have a posted file.
    if (!req.files) {
        return res.send('No file specified in request\n', 400);
    }
    // The file must be a javascript file.
    var file = req.files.file;    
    if ('.js' !== path.extname(file.name)) {
        return res.send('File extension must be .js\n', 400);
    }
    
    // Parse optional options object.
    if (typeof options === "string") {
        try {
            options = JSON.parse(options);
        } catch (e) {
            options = {}; 
        }
    }

    helpers.errorsFromFile(file.path, options, function(err, hintErrors) {
        if (err) {
            res.send('Error: ' + err, 500);
        }
        if (hintErrors.length > 0) {
            res.send(hintErrors);
        } else {
            res.send(204);
        }
    }); 
}