function tokenToAst(tok, vars) {
    var l;
    try {
      l = JSON.parse(tok.tok());
      return [tag((typeof l === 'number' && vars.find(l) ? ref(l) : lit(l)), tok.start(), tok.end())];
    } catch (err) {
      return [tag(ref(tok.tok()), tok.start(), tok.end())];
    }
  }