function(block, test, err) {
        if (err) {
          joePrivate.errord = true;
        }
        joe.report('finishTest', block, test, err);
        return _Class.__super__.blockTaskAfter.apply(this, arguments);
      }