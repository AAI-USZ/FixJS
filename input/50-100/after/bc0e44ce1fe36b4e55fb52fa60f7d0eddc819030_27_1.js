function() {
      subject.state('/foo', uniq);

      hasClear();
      assert.equal(page.routes[0][0], '/foo');
      assert.equal(page.routes[0][2], uniq);
    }