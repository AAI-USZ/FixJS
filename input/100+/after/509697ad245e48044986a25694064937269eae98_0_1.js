function include (record) {
      var node = record.node
        , attr = record.include
        , href = normalize(base, attr.nodeValue.replace(/^[^:]+:/, ''))
        ;

      fetch(href, check(done, function (template) {
        var callee = [ wrap(template.doc.cloneNode(true)) ]
          , blocks = record.node.getElementsByTagNameNS(attr.nodeValue, '*')
          , i, I
          ;

        callee[0].funcs = template.funcs;

        callee[0].context =
        { source: { file: "foo.js", url: template.url }
        , caller: record.node
        , attrs: record.attrs
        , blocks: {}
        };

        for (i = 0, I = blocks.length; i < I; i++) {
          callee[0].context.blocks[blocks[i].localName] = blocks[i];
        }

        xmlify(href, callee, stack, depth + 1, check(done, function (doc) {
          doc = node.ownerDocument.importNode(doc, true);
          node.parentNode.insertBefore(doc, node);
          node.parentNode.removeChild(node);
          record.node = doc;
          resume();
        }));
      }));
    }