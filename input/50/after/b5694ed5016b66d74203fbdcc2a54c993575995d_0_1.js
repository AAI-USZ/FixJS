function (content) {
          assert.strictEqual(node.document.tree.documentElement.innerHTML, content.documentElement.innerHTML);
          done();
        }