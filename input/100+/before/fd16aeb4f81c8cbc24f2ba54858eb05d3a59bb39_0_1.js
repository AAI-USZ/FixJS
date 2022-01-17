function(buf, off) {
            debug('frame_lo(' + sys.inspect(buf) + ', ' + off + ')');

            // Find the first instance of 0xff, our terminating byte
            for (var i = off; i < buf.length && buf[i] != 0xff; i++)
                ;

            // We didn't find a terminating byte
            if (i >= buf.length) {
                return 0;
            }

            // We found a terminating byte; collect all bytes into a single buffer
            // and emit it
            var mb = null;
            if (bufs.length == 0) {
                mb = buf.slice(off, i);
            } else {
                mb = new buffer.Buffer(bufsBytes + i);

                var mbOff = 0;
                bufs.forEach(function(b) {
                    b.copy(mb, mbOff, 0, b.length);
                    mbOff += b.length;
                });

                assert.equal(mbOff, bufsBytes);

                // Don't call Buffer.copy() if we're coping 0 bytes. Rather
                // than being a no-op, this will trigger a range violation on
                // the destination.
                if (i > 0) {
                    buf.copy(mb, mbOff, off, i);
                }

                // We consumed all of the buffers that we'd been saving; clear
                // things out
                bufs = [];
                bufsBytes = 0;
            }

            process.nextTick(function() {
                var b = mb;
                return function() {
                    var m = b.toString('utf8');

                    self.emit('data', b);
                    self.emit('message', m);        // wss compat

                    if (self.onmessage) {
                        self.onmessage({data: m});
                    }
                };
            }());

            frameType = FRAME_NO;
            return i - off + 1;
        }