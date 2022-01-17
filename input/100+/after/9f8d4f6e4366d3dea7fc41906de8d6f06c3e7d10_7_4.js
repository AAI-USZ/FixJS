function tokenToAst(tok, vars) {
    var l, t;
    try {
      l = JSON.parse(tok.tok());
      t = typeof l;
      return [tag((t === 'number' && vars.find(l) ? ref(l) : t === 'string' || t === 'number' ? lit(l) : ref(tok.tok())), tok.start(), tok.end())];
    } catch (err) {
      return [tag(ref(tok.tok()), tok.start(), tok.end())];
    }
  }