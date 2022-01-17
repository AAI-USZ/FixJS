function(url) {
        var response = "http://a.asset." + options.domain + url;
        for (var i = 0; i < clients.length; i++) {
            try {
                clients[i].response.writeHead(
                    200,
                    {
                        'Content-Length': response.length,
                        'Content-Type': 'text/plain'
                    }
                );
                clients[i].response.end(response);
                served++;
                options.logger.access(clients[i].request, 200, response.length);
                updateStats();
            } catch (e) {
                //dont care
            }
        }
        clients = [];
    }