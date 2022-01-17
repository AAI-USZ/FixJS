function(input, attrs){
    // mix input with attrs
    for(var key in attrs)
      if(typeof input[key] == "undefined")
        input[key] = attrs[key];
      else
      if(Array.isArray(input[key]))
        for(var i = 0; i<attrs[key].length; i++)
          input[key].push(attrs[key][i]);
      else
      if(typeof input[key] == "object")
        _.extend(input[key], attrs[key]);
      else
          input[key] = attrs[key];
    return input;
  }