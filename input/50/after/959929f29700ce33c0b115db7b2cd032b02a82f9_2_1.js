function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    }