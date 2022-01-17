function(err, httpHeaders) {
                if (!Util.empty(err))
                    return self.handleError(err);
                var nodeSize = null;
                // ContentType needs to get a default, because many webservers
                // will otherwise default to text/html, and we don't want this
                // for security reasons.
                if (!httpHeaders["content-type"])
                    httpHeaders["content-type"] = "application/octet-stream";

                if (httpHeaders["content-length"]) {
                    nodeSize = httpHeaders["content-length"];
                    // Need to unset Content-Length, because we'll handle that
                    // during figuring out the range
                    delete httpHeaders["content-length"];
                }

                //this.httpResponse.setHeaders(httpHeaders);

                var range             = self.getHTTPRange();
                var ifRange           = self.httpRequest.headers["if-range"];
                var ignoreRangeHeader = false;

                // If ifRange is set, and range is specified, we first need
                // to check the precondition.
                if (nodeSize && range && ifRange) {
                    // if IfRange is parsable as a date we'll treat it as a
                    // DateTime otherwise, we must treat it as an etag.
                    try {
                        var ifRangeDate = new Date(ifRange);

                        // It's a date. We must check if the entity is modified
                        // since the specified date.
                        if (!httpHeaders["last-modified"]) {
                            ignoreRangeHeader = true;
                        }
                        else {
                            var modified = new Date(httpHeaders["last-modified"]);
                            if (modified > ifRangeDate)
                                ignoreRangeHeader = true;
                        }
                    }
                    catch (ex) {
                        // It's an entity. We can do a simple comparison.
                        if (!httpHeaders["etag"])
                            ignoreRangeHeader = true;
                        else if (httpHeaders["etag"] !== ifRange)
                            ignoreRangeHeader = true;
                    }
                }
                
                // Ignore range header if node size is wrong
                if (nodeSize && range) {
                    if (range[2] && nodeSize != range[2])
                        ignoreRangeHeader = true;
                }

                // We're only going to support HTTP ranges if the backend
                // provided a filesize
                if (!ignoreRangeHeader && nodeSize && range) {
                    // Determining the exact byte offsets
                    var start, end;
                    if (typeof range[0] == 'number') {
                        start = range[0];
                        end   = range[1] ? range[1] : nodeSize - 1;
                        if (start > nodeSize) {
                            return self.handleError(new Exc.jsDAV_Exception_RequestedRangeNotSatisfiable(
                                "The start offset (" + range[0] + ") exceeded the size of the entity ("
                                + nodeSize + ")")
                            );
                        }

                        if (end < start) {
                            return self.handleError(new Exc.jsDAV_Exception_RequestedRangeNotSatisfiable(
                                "The end offset (" + range[1] + ") is lower than the start offset ("
                                + range[0] + ")")
                            );
                        }
                        if (end > nodeSize)
                            end = nodeSize - 1;

                    }
                    else {
                        start = nodeSize - range[1];
                        end   = nodeSize - 1;
                        if (start < 0)
                            start = 0;
                    }

                    var offlen = end - start + 1;
                    // Prevent buffer error
                    // https://github.com/joyent/node/blob/v0.4.5/lib/buffer.js#L337
                    if (end < start)
                       start = end; // TODO: what makes the most sense to do here?

                    httpHeaders["content-length"] = offlen;
                    httpHeaders["content-range"]  = "bytes " + start + "-" + end + "/" + nodeSize;

                    if (hasStream) {
                        var writeStreamingHeader = function () {
                            self.httpResponse.writeHead(206, httpHeaders);
                        };

                        node.getStream(start, end, function(stream) {
                            stream.on("data", function(data) {
                                // write header on first incoming buffer
                                if (writeStreamingHeader) {
                                    writeStreamingHeader();
                                    writeStreamingHeader = null;
                                }

                                if (!self.httpResponse.write(data)) {
                                    // output stream is choking, wait for it catch up
                                    stream.pause();
                                }
                            });

                            stream.on("error", function(err) {
                                if (!writeStreamingHeader) {
                                    self.httpResponse.end();
                                    console.error("jsDAV GET error", err);
                                }
                                else {
                                    self.handleError(err);
                                }
                                return;
                            });

                            stream.on("end", function() {
                                self.httpResponse.end();
                            });
                            
                            self.httpResponse.on('drain', function () { 
                                // output buffer drained, dump more into it
                                stream.resume();
                            });
                        });
                    }
                    else {
                        node.get(function(err, body) {
                            if (!Util.empty(err))
                                return self.handleError(err);

                            // New read/write stream
                            var newStream = new Buffer(offlen);
                            body.copy(newStream, 0, start, offlen);

                            self.httpResponse.writeHead(206, httpHeaders);
                            self.httpResponse.end(newStream);
                        });
                    }
                }
                else {
                    var since        = self.httpRequest.headers["if-modified-since"];
                    var oldEtag      = self.httpRequest.headers["if-none-match"];
                    var lastModified = httpHeaders["last-modified"];
                    var etag         = httpHeaders["etag"];
                    since = since && Date.parse(since).valueOf();
                    lastModified = lastModified && Date.parse(lastModified).valueOf();
                    // If there is no match, then move on.
                    if (!((since && lastModified === since) || (etag && oldEtag === etag))) {
                        if (nodeSize)
                            httpHeaders["content-length"] = nodeSize;
                        if (hasStream) {
                            var writeStreamingHeader = function () {
                                self.httpResponse.writeHead(200, httpHeaders);
                            };

                            // no start or end means: get all file contents.
                            node.getStream(null, null, function(stream) {
                                self.httpResponse.on('drain', function () { 
                                    // output buffer drained, dump more into it
                                    stream.resume();
                                });

                                stream.on("data", function(data) {
                                    // write header on first incoming buffer
                                    if (writeStreamingHeader) {
                                        writeStreamingHeader();
                                        writeStreamingHeader = null;
                                    }

                                    if (!self.httpResponse.write(data)) {
                                        // output stream is choking, wait for it catch up
                                        stream.pause();
                                    }
                                });

                                stream.on("error", function(err) {
                                    if (!writeStreamingHeader) {
                                        self.httpResponse.end();
                                        console.error("jsDAV GET error", err);
                                    }
                                    else {
                                        self.handleError(err);
                                    }
                                    return;
                                });

                                stream.on("end", function() {
                                    self.httpResponse.end();
                                });
                            });
                        }
                        else {
                            node.get(function(err, body) {
                                if (!Util.empty(err))
                                    return self.handleError(err);

                                self.httpResponse.writeHead(200, httpHeaders);
                                self.httpResponse.end(body);
                            });
                        }
                    }
                    else {
                        // Filter out any Content based headers since there
                        // is no content.
                        var newHeaders = {};
                        Object.keys(httpHeaders).forEach(function(key) {
                            if (key.indexOf("content") < 0)
                                newHeaders[key] = httpHeaders[key];
                        });
                        self.httpResponse.writeHead(304, newHeaders);
                        self.httpResponse.end();
                    }
                }
            }