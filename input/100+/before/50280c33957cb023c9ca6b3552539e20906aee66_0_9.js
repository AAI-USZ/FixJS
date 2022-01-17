function (request) {

        var index = -1;

        var method = request.method.toLowerCase();



        if (postman.currentRequest.isMethodWithBody(method)) {

            return -1;

        }



        var requests = this.requests;

        var len = requests.length;



        for (var i = 0; i < len; i++) {

            var r = requests[i];

            if (r.url.length !== request.url.length ||

                r.headers.length !== request.headers.length ||

                r.method !== request.method) {

                index = -1;

            }

            else {

                if (r.url === request.url) {

                    if (r.headers === request.headers) {

                        index = i;

                    }

                }

            }



            if (index >= 0) {

                break;

            }

        }



        return index;

    }