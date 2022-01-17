function(method) {
    return "function (a) {\n    var args = __slice__.call(arguments, 1);\n    var new_a = a.slice();\n    new_a." + method + ".apply(new_a, args);\n    return new_a;\n}";
  }