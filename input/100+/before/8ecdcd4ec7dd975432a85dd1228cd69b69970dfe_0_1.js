function(response) {
        var body = '';
        response.on('data', function(chunk) {
            body += chunk;
        });
        response.on('end', function() {
            if (response.statusCode >= 300) {
                var explanation = body.match(/<error>([^<]+)/i);
                explanation = (explanation) ?
                              ':' + explanation[1] :
                              '';

                console.log('Notification failed ' + response.statusCode + explanation)
                console.log('Request: ' + body);
            } else {
                // Give me a break, this is legit : )
                var m = body.match(/<err-id>([^<]+)/i);
                var id = (m)
                    ? m[1]
                    : null;

                console.log('Created in airbrake: ' + id);
            }
        });
    }