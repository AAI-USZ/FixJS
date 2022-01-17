function()
  {
    var re_escape_char = /\\/g;
    var re_quot_mark = /"/g;

    return function escape_input(str)
    {
      // Need to double escape since this is a string inside a string
      return str.replace(re_escape_char, "\\\\")
                .replace(re_quot_mark, "\\\"");
    }
  }