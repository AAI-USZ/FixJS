function() {
        if(happy) {
            args.logEmitter.emitWarning(args.httpReqTx.event, {
                message: "'timeout' received when not expected"
            });
            return;
        }
        timedout = true;

        // No need to end/destroy the socket since node does it.

        charlie.notok([args.uri, args.name]);
        return args.httpReqTx.end({
            message: 'Request timed out',
            timeout: timeout,
            uri: args.uri,
            status: 502
        });
    }