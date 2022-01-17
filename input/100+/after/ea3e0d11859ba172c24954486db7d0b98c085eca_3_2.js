function escape_input(str)
    {
      for (var i = 0, re; re = replacement_map[i]; i++)
      {
        str = str.replace(re.regexp, re.replacement);
      }
      return str;
    }