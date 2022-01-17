function(data) {
      try {
        var args = endpoint.deserializer.apply(data.args);
        var result = invokeHandler(endpoint, data.method, args);
        return {value: endpoint.serializer.apply(result)};
      } catch (e) {
        return {exception: e.toString()};
      }
    }