function(buf, off) {
            debug('frame_hi(' + util.inspect(buf) + ', ' + off + ')');

            if (buf[off] !== 0) {
                throw new Error('High-byte framing not supported.');
            }

            serverClosed = true;
            return 1;
        }