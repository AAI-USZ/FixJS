function(res) {
                that.soupResponse = res;

                switch (res.headers['content-encoding']) {
                    case 'gzip':
                        that.contentEncoding = 'gzip';
                        break;
                    case 'deflate':
                        that.contentEncoding = 'deflate';
                        break;
                    default:
                        that.contentEncoding = false;
                        break;
                }

                res.setEncoding('binary');

                res.on('data', that.onSoupData);

                if (that.shouldTransformData(res.headers)) {
                    res.on('end', that.onSoupEndTransform);
                } else {
                    res.on('end', that.onSoupEnd);
                }
            }