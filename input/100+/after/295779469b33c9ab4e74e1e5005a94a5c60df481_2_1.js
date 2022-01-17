function()
  {
    var replacement_map = [
      {
        regexp: /\\/g,
        replacement: "\\\\"
      },
      {
        regexp: /"/g,
        replacement: "\\\""
      },
      {
        regexp: /'/g,
        replacement: "\\'"
      },
      {
        regexp: /\n/g,
        replacement: "\\n"
      },
      {
        regexp: /\r/g,
        replacement: "\\r"
      },
      {
        regexp: /\u2028/g,
        replacement: "\\u2028"
      },
      {
        regexp: /\u2029/g,
        replacement: "\\u2029"
      }
    ];

    return function escape_input(str)
    {
      for (var i = 0, re; re = replacement_map[i]; i++)
      {
        str = str.replace(re.regexp, re.replacement);
      }
      return str;
    }
  }