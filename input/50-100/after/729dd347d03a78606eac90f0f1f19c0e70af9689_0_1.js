function requisite (attr) {
      var record = stack.shift()
        , into = attr.localName
        , href = attr.nodeValue.replace(/^[^:]+:/, '')
        ;

      resolver(href, "text/javascript", check(done, function (module) {
        record.context[into] = module;
        record.loading++;
        if (visit(record)) resume();
      }));

      return false;
    }