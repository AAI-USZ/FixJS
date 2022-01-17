function(value, index, list) {
      if (result |= iterator.call(context, value, index, list)) return breaker;
    }