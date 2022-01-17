function http_error_handler(ex) {
        // We enforce similar semantics as the rest of the node.js for the 'error'
        // event and throw an exception if it is unhandled
        if (!bep.emit('error', ex)) {
            throw new Error(
                sprintf('ERROR (%s) on listener at endpoint: http://%s:%s%s',
                        String(ex), options.host, options.port, options.path)
            );
        }
    }