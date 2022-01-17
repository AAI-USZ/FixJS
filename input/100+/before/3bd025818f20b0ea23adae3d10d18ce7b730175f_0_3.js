function(script, line_number)

  {

    var tokens = [];

    if (script)

    {

      var line = script.get_line(line_number);

      var start_state = script.state_arr[line_number - 1];



      if (line)

      {

        _tokenizer.tokenize(line, function(token_type, token)

        {

          tokens.push([token_type, token]);

        }, false, start_state);

      }

    }

    return tokens;

  }