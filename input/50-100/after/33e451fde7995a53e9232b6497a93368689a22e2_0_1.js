function() {
        var len = 1;

        var b;

        if (len < buffer.length) {
            b = buffer.slice(0, len);

            buffer = buffer.slice(len, buffer.length);

            process.nextTick(emitData);
        } else {
            b = buffer.slice(0, buffer.length);

            process.nextTick(function() {
                self.emit('end');
            });
        }

        self.emit('data', b);
    }