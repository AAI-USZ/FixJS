function() {
                var enc = false;
                if (that.request.headers && that.request.headers['accept-encoding'] && that.contentEncoding) {
                    var renc = that.request.headers['accept-encoding'];
                    if (/gzip/.test(renc)) {
                        enc = 'gzip';
                    } else if (/deflate/.test(renc)) {
                        enc = 'deflate';
                    }
                }

                return enc;
            }