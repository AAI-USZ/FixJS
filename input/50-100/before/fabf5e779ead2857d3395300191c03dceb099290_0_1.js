function(input_kde, factor) {
    var output = [];
    $.each(input_kde.sort(), function(index, value) {
      output[index] = [value[0], value[1] * factor]
    });
    return output;
  }