function (stream, opts) {
        if (!stream || !stream.write) {
            opts = parseArgs(arguments);
            stream = opts.stream;
        }
        if (!opts) opts = {};
        
        if (!opts.headers) opts.headers = {};
        if (!('x-forwarded-for' in opts.headers)) {
            opts.headers['x-forwarded-for'] = client.remoteAddress;
        }
        if (!('x-forwarded-port' in opts.headers)) {
            var m = (req.headers.host || '').match(/:(\d+)/);
            opts.headers['x-forwarded-port'] = m && m[1] || 80;
        }
        if (!('x-forwarded-proto' in opts.headers)) {
            opts.headers['x-forwarded-proto'] =
                client.encrypted ? 'https' : 'http';
        }
        
        insertHeaders(bs.chunks, opts.headers);
        if (opts.path) updatePath(bs.chunks, opts.path);
        
        if (stream.writable && client.writable) {
            bs.pipe(stream);
            stream.pipe(client);
        }
        else if (opts.emitter) {
            opts.emitter.emit('drop', client);
        }
        
        stream.on('error', function (err) {
            if (stream.listeners('error').length === 1) {
                // destroy the request and stream if nobody is listening
                req.destroy();
                stream.destroy();
            }
        });
        
        client.on('error', function (err) {
            req.destroy();
            stream.destroy();
        });
        
        return stream;
    }