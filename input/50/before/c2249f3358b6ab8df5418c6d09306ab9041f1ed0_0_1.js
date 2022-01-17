function(req, res) {
    res.contentType('application/json');
    res.send(JSON.stringify(cu_play));
}