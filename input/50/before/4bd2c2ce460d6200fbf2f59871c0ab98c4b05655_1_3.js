function(err) {
        ++finished;
        return assert.equal(false, err != null, 'no error is present');
      }