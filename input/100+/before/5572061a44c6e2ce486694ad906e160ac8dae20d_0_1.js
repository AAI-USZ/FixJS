function(first) {
      property.min = (first === '*' || first === '?') ? 0 : 1
      property.max = (first === '*' || first === '+') ? Infinity : 1
      return ''
    }