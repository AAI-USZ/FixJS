function (content) {
          assert.strictEqual(node.document.tree.innerHTML, content.innerHTML);
          done();
        }