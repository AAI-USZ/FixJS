function(input)
  {
    var tokens = [];

    this._parser.tokenize(input, function(token_type, token)
    {
      tokens.push([token_type, token]);
    });

    var last_bracket = this._get_last_punctuator(tokens, '[');
    var last_brace = this._get_last_punctuator(tokens, '(');

    last_brace = this._get_last_punctuator(tokens, ')') <= last_brace 
               ? last_brace
               : -1;
    last_bracket = this._get_last_punctuator(tokens, ']') <= last_bracket 
                 ? last_bracket
                 : -1;
    input = input.slice(Math.max(last_brace,
                                 last_bracket,
                                 this._get_last_punctuator(tokens, '=')) + 1);
    input = input.replace(/^\s+/, '');

    var last_dot = input.lastIndexOf('.');
    var new_path = '';
    var new_id = '';
    var ret = '';

    if(last_dot > -1)
    {
      new_path = input.slice(0, last_dot);
      new_id = input.slice(last_dot + 1).replace(/^\s+/, '');
    }
    else
    {
      new_id = input;
    }

    return {scope: new_path, identifier: new_id, input: input};
  }