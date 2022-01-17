function(data, meta) {
                    var ct = meta.http.headers['content-type'];
                    doneCalled = true;
                    A.areSame('hi',data, 'bad string to done');
                    A.areSame(1, ct.length, "should be only one content-type header");
                    A.areSame('text/plain; charset=utf-8', ct[0]);
                }