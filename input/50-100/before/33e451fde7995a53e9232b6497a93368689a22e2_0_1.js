function() {
        var len = 1;

        var b = buffer.slice(0, len);

        if (len < buffer.length) {
            buffer = buffer.slice(len, buffer.length);
            process.nextTick(emitData);
        } else {
            process.nextTick(function() {
                self.emit('end');
            });
        }

        self.emit('data', b);
    }