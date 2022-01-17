function(err, data) {
                            if (err) {
                                if (!writeStreamingHeader) {
                                    self.httpResponse.end();
                                    console.error("jsDAV GET error", err);
                                }
                                else {
                                    self.handleError(err);
                                }
                                return;
                            }

                            if (!data)
                                return self.httpResponse.end();

                            self.httpResponse.write(data);
                        }