function(response) {
        var responseBody = '';
        response.on('data', function(chunk) {
            responseBody += chunk;
        });
        response.on('end', function() {
            if (response.statusCode >= 300) {
                var m = responseBody.match(/<h1>([^<]+)/i);

                util.log('Notification failed ' + response.statusCode + (m ? ': ' + m[1] : '') + "\n\n" + 'Request was: ' + body);
            } else {
                var m = responseBody.match(/<err-id>([^<]+)/i);

                util.log('Created in airbrake: ' + (m) ? m[1] : '');
            }
        });
    }