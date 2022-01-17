function() {
            if (response.statusCode >= 300) {
                var message = '';

                var m = responseBody.match(/<h1>([^<]+)/i);
                if (m) {
                    message += ': ' + m[1];
                    var m = responseBody.match(/<pre>([^<]+)/i);
                    if (m) {
                        message += ' ' + m[1];
                    }
                }

                util.log('Notification failed ' + response.statusCode + message + "\n\n" + 'Request was: ' + body);
            } else {
                var m = responseBody.match(/<err-id>([^<]+)/i);

                util.log('Created in airbrake: ' + ((m) ? m[1] : ''));
            }
        }