function(message, fileurl, lineno, traceback, timestamp) {
        var label, stacktrace, data, encoded_msg, type,
            url = root.location.origin + root.location.pathname,
            querystring = root.location.search.slice(1);  // Remove the ?

        if (typeof(message) === 'object') {
            type = message.name;
            message = message.message;
        }
        if ($.inArray(message, self.options.ignoreErrors) >= 0) {
            return;
        }

        label = lineno ? message + " at " + lineno : message;

        if (traceback) {
            stacktrace = {"frames": traceback};
            fileurl = fileurl || traceback[0].filename;
        } else if (fileurl) {
            stacktrace = {
                "frames": [{
                    "filename": fileurl,
                    "lineno": lineno
                }]
            };
        }

        data = {
            "message": label,
            "culprit": fileurl,
            "sentry.interfaces.Stacktrace": stacktrace,
            "sentry.interfaces.Exception": {
                "type": type,
                "value": message
            },
            "project": self.options.projectId,
            "logger": self.options.logger,
            "site": self.options.site
        };

        if (!self.options.testMode) {
            data["sentry.interfaces.Http"] = {
                "url": url,
                "querystring": querystring,
                "headers": self.getHeaders()
            };
        }

        timestamp = timestamp || (new Date()).getTime();
        encoded_msg = JSON.stringify(data);
        self.getSignature(encoded_msg, timestamp, function(signature) {
            var header = self.getAuthHeader(signature, timestamp);
            $.each(self.options.servers, function (i, server) {
                $.ajax({
                    type: 'POST',
                    url: server,
                    data: encoded_msg,
                    headers: {
                        // We send both headers, since Authentication may be blocked,
                        // and custom headers arent supported in IE9
                        'X-Sentry-Auth': header,
                        'Authentication': header
                    }
                });
            });
        });
    }