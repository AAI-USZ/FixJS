function (chunk) {
            happy = true;
            if (zipped) {
                // TODO Check for corrupted stream. Empty 'bufs' may indicate invalid stream
                unzip.write(chunk);
            }
            else {
                // Chunk is a buf as we don't set any encoding on the response
                bufs.push(chunk);
            }
            responseLength += chunk.length;
            maxResponseLength = maxResponseLength || getMaxResponseLength(args.config, args.logEmitter);
            if (responseLength > maxResponseLength) {
                var err = new Error('Response length exceeds limit');
                err.uri = args.uri;
                err.status = 502;

                args.logEmitter.emitError(args.httpReqTx.event, JSON.stringify({
                    message: 'Response length ' + responseLength + ' exceeds config.maxResponseLength of ' + maxResponseLength
                }));
                res.socket.destroy();
                return args.httpReqTx.cb(err);
            }
        }