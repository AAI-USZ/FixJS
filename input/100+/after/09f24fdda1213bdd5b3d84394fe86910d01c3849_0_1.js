function () {
                requestSequence += 1; // increment the sequence
                var requestNumber = requestSequence, // this request's sequence number
                    data = options.data, // ajax data function
                    transport = options.transport || $.ajax,
                    type = options.type || 'GET'; // set type of request (GET or POST)
                
                data = data.call(this, query.term, query.page, query.context);

                if( null !== handler) { handler.abort(); }
                
                handler = transport.call(null, {
                    url: options.url,
                    dataType: options.dataType,
                    data: data,
                    type: type,
                    success: function (data) {
                        if (requestNumber < requestSequence) {
                            return;
                        }
                        // TODO 3.0 - replace query.page with query so users have access to term, page, etc.
                        var results = options.results(data, query.page);
                        query.callback(results);
                    }
                });
            }