function (settings, xhr) {

            var header,

                headers = settings.headers;



            if (headers !== null) {

                for (header in headers) {

                    if (headers.hasOwnProperty(header)) {

                        xhr.setRequestHeader(header, headers[header]);

                    }

                }

            }

        }