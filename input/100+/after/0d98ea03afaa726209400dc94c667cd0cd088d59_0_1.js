function () {
                requestSequence += 1; // increment the sequence
                var requestNumber = requestSequence, // this request's sequence number
                    data = options.data, // ajax data function
                    transport = options.transport || $.ajax;

                data = data.call(this, query.term, query.page, query.roundtripValue);

                if( null !== handler){
                    handler.abort();
                }
                handler = transport.call(null, {
                    url: options.url,
                    dataType: options.dataType,
                    data: data,
                    success: function (data) {
                        if (requestNumber < requestSequence) {
                            return;
                        }
                        // TODO 3.0 - replace query.page with query so users have access to term, page, etc.
                        var results = options.results(data, query.page);
                        self.resultsRoundtripValue = results['roundtripValue'];
                        query.callback(results);
                    }
                });
            }