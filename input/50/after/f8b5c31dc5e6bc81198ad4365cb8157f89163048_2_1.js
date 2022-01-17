function (error, orginal, copy) {
        assert.ifError(error);
        common.matchTree(copy.tree, orginal.tree);
      }