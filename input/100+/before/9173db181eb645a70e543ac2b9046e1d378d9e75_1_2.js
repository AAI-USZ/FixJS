function toSignatureBaseString(method, url, header_params, query_params) {
        var arr = [], i, encode = OAuth.urlEncode;

        for (i in header_params) {
            if (header_params[i] !== undefined && header_params[i] !== '') {
                arr.push([OAuth.urlEncode(i), OAuth.urlEncode(header_params[i]+'')]);
            }
        }

        for (i in query_params) {
            if (query_params[i] !== undefined && query_params[i] !== '') {
                if (!header_params[i]) {
                    arr.push([encode(i), encode(query_params[i] + '')]);
                }
            }
        }

        arr = arr.sort(function(a, b) {
          if (a[0] < b[0]) {
            return -1;
          } else if (a[0] > b[0]) {
            return 1;
          } else {
            if (a[1] < b[1]) {
              return -1;
            } else if (a[1] > b[1]) {
              return 1;
            } else {
              return 0;
            }
          }
        }).map(function(el) {
          return el.join("=");
        });

        return [
            method,
            encode(url),
            encode(arr.join('&'))
        ].join('&');
    }