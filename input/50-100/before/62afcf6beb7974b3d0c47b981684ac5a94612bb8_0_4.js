function() {
      var c_items;
      c_items = compile_list(arguments, null, true);
      return "(" + (c_items.join(',\n')) + ")";
    }