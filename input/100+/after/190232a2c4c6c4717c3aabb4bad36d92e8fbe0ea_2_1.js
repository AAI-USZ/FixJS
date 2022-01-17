f                                                                    space) {
  var token,
      depth = 0,
      dived = false,
      code = [];

  for (;;) {
    token = this.lookahead(null, null, true)

    if (matchToken(token, 'punc', ['{', '(', '['])) {
      depth++;
      dived = true;
    } else if (matchToken(token, 'punc', ['}', ')', ']'])) {
      depth--;
      dived = true;
    }

    if (dived && depth < 0 ||
        depth <= 0 && matchToken(token, 'punc', terminals)) {
      this.reject();
      break;
    }

    this.accept();

    code.push(this.lexer.stringify(token));

    if (space && depth <= 0 &&
        (matchToken(token, 'name') && this.lookahead('space') ||
         matchToken(token, 'space') &&
         (this.lookahead('punc', ['{', ':', '!', '=', '->']) ||
          this.lookahead('name') || this.lookahead('token')))) {
      this.reject();
      break;
    }
  }

  this.push(utils.expressionify(code.join('')));
  this.pop();
};
