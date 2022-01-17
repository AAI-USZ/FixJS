function(key) {
      var num_value = +params[key]
      fcgi_values[key] = isNaN(num_value) ? params[key] : num_value
    }