function parseExpression() {
  var self = this,
      token = this.expect(null, null, true),
      space = this.maybe('space'),
      matched = false;

  function parseInvocation() {
    var name;
    // grmr.rule
    if (self.maybe('punc', '.')) {
      name = [token.value, self.expect('name', null, true).value];
      space = self.maybe('space');
    } else {
      // rule
      name = [null, token.value];
    }

    // Maybe rule(...) ?
    if (!space && self.maybe('punc', '(')) {
      self.push(['call'].concat(name));
      self.push([]);
      self.parseUntil('punc', ')', true, function() {
        self.parseHostExpression([',']);
        self.maybe('punc', ',');
      });
      self.accept();
      self.pop();
      space = null;
    } else {
      self.push(['match'].concat(name));
    }
  }

  // Choice group (a | b | c)
  if (matchToken(token, 'punc', '(')) {
    // ( expr | ... | expr )
    this.push(['choice']);
    this.list('punc', '|', function() {
      this.push([]);
      this.parseUntil('punc', ['|', ')'], true, function() {
        this.parseExpression();
      });
      this.reject();
      this.pop();
    });
    this.reject();
    this.expect('punc', ')', true);
    space = null;

  // Array match [ a b c ]
  } else if (matchToken(token, 'punc', '[')) {
    this.push(['list']);
    // [ expr expr expr ]
    this.parseUntil('punc', ']', true, function() {
      this.maybe('space');
      this.parseExpression();
    });
    this.accept();
    space = null;

  // String's chars match < a b c >
  } else if (matchToken(token, 'punc', '<')) {
    this.push(['chars']);
    // [ expr expr expr ]
    this.parseUntil('punc', '>', true, function() {
      this.maybe('space');
      this.parseExpression();
    });
    this.accept();
    space = null;

  // Super call ^rule
  } else if (matchToken(token, 'punc', '^')) {
    this.push(['super']);
    token = this.expect('name', null, true);
    space = this.maybe('space');
    parseInvocation();
    this.pop();

  // Predicate ?host-language-code
  } else if (matchToken(token, 'punc', '?')) {
    this.push(['predicate']);
    this.parseHostExpression([',', '|', '->', '&', '?'], true);
    space = null;

  // Local %host-language-code
  } else if (matchToken(token, 'punc', '%')) {
    this.push(['local']);
    this.expect('punc', '(');
    this.parseHostExpression([]);
    this.expect('punc', ')', true);
    space = null;

  // Lookahead
  } else if (matchToken(token, 'punc', '&')) {
    this.push(['lookahead']);
    space = this.parseExpression();

  // Not
  } else if (matchToken(token, 'punc', '~')) {
    this.push(['not']);
    space = this.parseExpression();

  // Host language result -> { ..code.. }
  } else if (matchToken(token, 'punc', '->')) {
    this.push(['result']);
    this.parseHostExpression([',', '|']);

  // Rule invocation name or name(...)
  } else if (matchToken(token, 'name')) {
    switch (token.value) {
      case 'true':
        this.push(['bool', true]);
        break;
      case 'false':
        this.push(['bool', false]);
        break;
      case 'null':
        this.push(['null']);
        break;
      default:
        parseInvocation();
        break;
    }

  // Number match 123
  } else if (matchToken(token, 'number')) {
    this.push(['number', parseFloat(token.value)]);

  // String match '123'
  } else if (matchToken(token, 'string')) {
    this.push(['string', token.value]);

  // Token match "123"
  } else if (matchToken(token, 'token')) {
    this.push(['call', null, 'token', [
      JSON.stringify(token.value)
    ]]);

  // Sequence match ``123''
  } else if (matchToken(token, 'sequence')) {
    this.push(['choice']);
    this.push([]);
    for (var i = 0; i < token.value.length; i++) {
      this.push(['string', token.value.charAt(i)]);
      this.pop();
    }
    this.pop();

  // Host language chunk
  } else if (matchToken(token, 'punc', '{')) {
    this.push(['body']);
    this.parseHostExpression(['}']);
    this.expect('punc', '}', true);
    space = null;

  // Just argument
  } else {
    this.push(['match', null, 'anything']);
  }

  if (space === null) space = this.maybe('space');

  if (!space) {
    // Modificators
    if (this.maybe('punc', '*')) {
      this.wrap(['any']);
      space = null;
    } else if (this.maybe('punc', '+')) {
      this.wrap(['many']);
      space = null;
    } else if (this.maybe('punc', '?')) {
      this.wrap(['optional']);
      space = null;
    }

    if (matchToken(token, 'punc', ':') || !space && this.maybe('punc', ':')) {
      this.wrap(['arg']);
      this.push(this.expect('name').value);
      this.pop();
      space = null;
    }

    if (space === null) space = this.maybe('space');
  }  this.pop();

  return space;
};
