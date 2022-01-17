function(tmplName) {
        ready.push(tmplName);
        if (names.length === ready.length)
          compile(src, refs);
      }