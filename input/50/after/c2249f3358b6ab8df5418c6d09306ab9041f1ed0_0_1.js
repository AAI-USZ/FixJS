function(req, res) {
    res.contentType('application/json');
    cu_play['progress'] = microtime.now() - dospotify.current_track_start_time;
    res.send(JSON.stringify(cu_play));
}