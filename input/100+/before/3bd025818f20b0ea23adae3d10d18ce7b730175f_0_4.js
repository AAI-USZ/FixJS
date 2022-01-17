function(script, line_number, tokens,

                                             match_index, shift_key)

  {

    var start_line = line_number;

    var bracket_count = 0;

    var previous_token = tokens[match_index];

    var bracket_stack = [];

    var parens_stack = [];

    var index = match_index - 1;



    if (previous_token[VALUE] == "]")

      bracket_stack.push(previous_token[VALUE]);



    if (shift_key && previous_token[VALUE] == ")")

      parens_stack.push(previous_token[VALUE]);



    while (true)

    {

      for (var i = match_index - 1, token = null; token = tokens[i]; i--)

      {

        // consume everything between parentheses if shiftKey is pressed

        if (shift_key && parens_stack.length)

        {

          if (token[TYPE] == PUNCTUATOR)

          {

            if (token[VALUE] == ")")

            {

              parens_stack.push(token[VALUE])

              previous_token = token;

            }

            if (token[VALUE] == "(")

            {

              parens_stack.pop();

              previous_token = token;

            }

          }

          index = i - 1;

          continue;

        }



        switch (previous_token[TYPE])

        {

          case IDENTIFIER:

          {

            switch (token[TYPE])

            {

              case WHITESPACE:

              case LINETERMINATOR:

              case COMMENT:

              {

                continue;

              }

              case PUNCTUATOR:

              {

                if (token[VALUE] == ".")

                {

                  previous_token = token;

                  index = i - 1;

                  continue;

                }

                if (token[VALUE] == "[" && bracket_stack.length)

                {

                  bracket_stack.pop();

                  previous_token = token;

                  index = i - 1;

                  continue;

                }

              }

            }

            break;

          }

          case PUNCTUATOR:

          {

            //previous_token[VALUE] is one of '.', '[', ']', '(', ')'

            if (shift_key && token[VALUE] == ")")

            {

              parens_stack.push(token[VALUE]);

              previous_token = token;

              index = i - 1;

              continue;

            }



            if (previous_token[VALUE] == "." || previous_token[VALUE] == "[")

            {

              switch (token[TYPE])

              {

                case WHITESPACE:

                case LINETERMINATOR:

                case COMMENT:

                {

                  continue;

                }

                case IDENTIFIER:

                {

                  previous_token = token;

                  index = i - 1;

                  continue;

                }

                case PUNCTUATOR:

                {

                  if (token[VALUE] == "]")

                  {

                    bracket_stack.push(token[VALUE]);

                    previous_token = token;

                    index = i - 1;

                    continue;

                  }

                }

              }

            }

            else // must be "]"

            {

              switch (token[TYPE])

              {

                case WHITESPACE:

                case LINETERMINATOR:

                case COMMENT:

                {

                  continue;

                }

                case STRING:

                case NUMBER:

                case IDENTIFIER:

                {

                  previous_token = token;

                  index = i - 1;

                  continue;

                }

                case PUNCTUATOR:

                {

                  if (token[VALUE] == "]")

                  {

                    bracket_stack.push(token[VALUE]);

                    previous_token = token;

                    index = i - 1;

                    continue;

                  }

                }

              }

            }

            break;

          }

          case STRING:

          case NUMBER:

          {

            switch (token[TYPE])

            {

              case WHITESPACE:

              case LINETERMINATOR:

              case COMMENT:

              {

                continue;

              }

              case PUNCTUATOR:

              {

                if (token[VALUE] == "[")

                {

                  bracket_stack.pop();

                  previous_token = token;

                  index = i - 1;

                  continue;

                }

              }

            }

            break;

          }

        }

        break;

      }



      if (i == -1)

      {

        var new_tokens = _get_tokens_of_line(script, start_line - 1);



        if (new_tokens.length)

        {

          start_line--;

          match_index = new_tokens.length;

          index += match_index;

          tokens = new_tokens.extend(tokens);

        }

        else

          break;

      }

      else

        break;

    }



    if (tokens[index + 1][TYPE] == PUNCTUATOR && tokens[index + 1][VALUE] == ".")

      index++;



    while (true)

    {

      var nl_index = _get_index_of_newline(tokens);

      if (nl_index > -1 && nl_index <= index)

      {

        index -= tokens.splice(0, nl_index + 1).length;

        start_line++;

      }

      else

        break

    }



    return {start_line: start_line, start_offset: _get_sum(tokens, index)};

  }