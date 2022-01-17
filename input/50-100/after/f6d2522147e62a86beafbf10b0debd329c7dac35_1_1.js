function (callback) {
    return function(req, res, next) {
        if (!req.body || req.method !== 'POST') {
            return next();
        }
            console.log('bar');

        if (req.header('x-github-event') !== 'push') {
            return next();     
        } 

        var payload = req.body.payload;
        res.send({ result: 'ok' }, 200);
        callback(payload);  
    };
}