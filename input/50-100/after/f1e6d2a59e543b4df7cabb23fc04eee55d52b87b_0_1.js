function(tokens, token_type, token_value)
  {
    if (tokens)
    {
      for (var i = tokens.length - 1, token; token = tokens[i]; i--)
      {
        if (token[TYPE] == token_type && token[VALUE] == token_value)
        {
          for (var j = 0, index = 0; j <= i; j++)
            index += tokens[j][VALUE].length;
          return index;
        }
      }
    }
    return -1;
  }