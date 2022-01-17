function(buf) {
        if (buf.length <= 0 || serverClosed) {
            return;
        }

        debug('dataListener(' + sys.inspect(buf) + ')');

        var off = 0;
        var consumed = 0;

        do {
            if (frameType < 0 || frameFuncs.length <= frameType) {
                throw new Error('Unexpected frame type: ' + frameType);
            }

            assert.equal(bufs.length === 0, bufsBytes === 0);
            assert.ok(off < buf.length);

            consumed = frameFuncs[frameType](buf, off);
            off += consumed;
        } while (!serverClosed && consumed > 0 && off < buf.length);

        if (serverClosed) {
            serverCloseHandler();
        }
        
        if (consumed == 0) {
            bufs.push(buf.slice(off, buf.length));
            bufsBytes += buf.length - off;
        }
    }