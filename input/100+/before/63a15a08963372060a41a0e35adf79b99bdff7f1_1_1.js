function parseMember() {
  var result = this.parsePrimary(true),
      colonCall = false;

  while (this.peek().type !== 'end' && this.peek().type !== 'cr') {
    if (colonCall && this.peek().type !== '(') {
      return this.setError('Expected "(" after colon call');
    }

    // Parse function declaration or call
    if (this.peek().type === '(') {
      this.skip();

      var args = [];

      if (colonCall) args.push(['self']);

      while (this.peek().type !== ')' && this.peek().type !== 'end') {
        var expr = this.parseExpression();
        if (!expr) return;

        args.push(expr);

        if (this.peek().type !== ',') break;

        this.skip();
        this.trimCr();
      }
      if (this.peek().type !== ')') {
        return this.setError('Failed to parse function\'s arguments, ' +
                             'expected ")"');
      }
      this.skip();

      var body = this.parseBlock();
      if (body) {
        if (result && result[0] !== 'name') {
          return this.setError('Function should have a correct name');
        }

        var seenVarArg = false,
            correctArgs = args.every(function(arg, i, args) {
              if (arg[0] === 'vararg') return i === args.length - 1;
              return arg[0] === 'name';
            });

        if (!correctArgs) {
          return this.setError('Incorrect arguments declaration');
        }

        return ['function', result || null, args, body[1]];
      } else {
        if (!result) {
          return this.setError('Call without name!');
        }

        var correctArgs = args.every(function(arg, i, args) {
          return arg[0] !== 'vararg' || i === args.length - 1;
        });

        if (!correctArgs) {
          return this.setError('Incorrect placement of var-arg');
        }

        return ['call', result, args];
      }
    } else {
      // Parse "." or "["
      if (!result) return this.setError('Expected "." or "["');

      var next,
          token = this.peek();
      switch (token.type) {
        case ':':
          if (colonCall) {
            return this.setError('Nested colons in method invocation!');
          }
          colonCall = true;
        case '.':
          // a.b || a:b(args)
          this.skip();
          next = this.parsePrimary(false);
          if (next && next[0] !== 'number') next[0] = 'property';
          break;
        case '[':
          // a["prop-expr"]
          this.skip();
          next = this.parseExpression();
          if (this.peek().type === ']') {
            this.skip();
          } else {
            next = null;
          }
          break;
        default:
          break;
      }

      if (!next) break;

      result = ['member', result, next];
    }
  }

  if (colonCall) {
    return this.setError('Expected "(" after colon call');
  }

  return result;
}