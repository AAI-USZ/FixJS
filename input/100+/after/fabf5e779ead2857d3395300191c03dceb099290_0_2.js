function(input_kde, factor) {
    var output = [];

    input_kde = (input_kde.sort(sort_arrays));
    $.each(input_kde, function(index, value) {
      output[index] = [value[0], value[1] * factor]
    });
    return output;
  }