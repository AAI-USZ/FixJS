function(data) {
      debug(endpoint, "received", data);
      var ret;
      try {
        var args = endpoint.deserializer.apply(data.args);
        debug(endpoint, "invoking", data.method, args);
        var result = invokeHandler(endpoint, data.method, args);
        debug(endpoint, data.method, "returned", result);
        ret = {value: endpoint.serializer.apply(result)};
      } catch (e) {
        debug(endpoint, data.method, "threw", e);
        ret = {exception: e.toString()};
      }
      debug(endpoint, "returning", ret);
      return ret;
    }