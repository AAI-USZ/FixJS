function encodeResponseHeaders (headers) {
      var encodedHeaders = {};
      for (var name in headers) {
        var lname = name.toLowerCase();
        var value = headers[name];
        if (lname === 'location') {
          value = encodeUrl(value);
        } else if (lname === 'set-cookie') {
          value = value.map(encodeCookie);
        }else if (lname === 'status') {
          continue;
        }
        encodedHeaders[name] = value;
      }
      return encodedHeaders;
    }