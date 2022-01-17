function() {
    var passed_array;
    passed_array = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return passed_array.slice(0, passed_array.length - 1);
  }