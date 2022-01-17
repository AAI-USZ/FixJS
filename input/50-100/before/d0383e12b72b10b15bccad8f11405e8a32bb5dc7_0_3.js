function(data, meta) {
                    var ct = meta.http.headers['content-type'];
                    doneCalled = true;
                    A.areSame('<xml><hi>there</hi></xml>', data, 'bad string to done');
                    A.areSame(1, ct.length, "should be only one content-type header");
                    A.areSame('application/xml; charset="utf-8"', ct[0]);
                }