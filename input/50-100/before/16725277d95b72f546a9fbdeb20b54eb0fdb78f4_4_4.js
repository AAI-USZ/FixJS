function(chunk) {
                try {
                    var newbuf = new Buffer(that.soupData.length + chunk.length);
                    that.soupData.copy(newbuf, 0, 0);
                    newbuf.write(chunk, that.soupData.length, chunk.length, 'binary');
                    that.soupData = newbuf;
                } catch (e) {
                    console.error(e.message);
                    console.error(e.stack);
                }
            }