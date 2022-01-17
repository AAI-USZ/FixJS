function(input)
  {
    var tokens = [];
    this._parser.tokenize(input, function(token_type, token)
    {
      tokens.push([token_type, token]);
    });
    var last_bracket = this._get_last_token(tokens, PUNCTUATOR, '[');
    var last_brace = this._get_last_token(tokens, PUNCTUATOR, '(');
    last_brace = this._get_last_token(tokens, PUNCTUATOR, ')') <= last_brace
               ? last_brace
               : -1;
    last_bracket = this._get_last_token(tokens, PUNCTUATOR, ']') <= last_bracket
                 ? last_bracket
                 : -1;
    var pos = Math.max(last_brace,
                       last_bracket,
                       this._get_last_token(tokens, PUNCTUATOR, '='),
                       this._get_last_token(tokens, IDENTIFIER, 'in'));
    if (pos > -1)
      input = input.slice(pos);
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