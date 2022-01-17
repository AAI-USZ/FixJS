function() {
      nock.restore();
      ret = nock.recorder.play();
      t.equal(ret.length, 1);
      t.equal(ret[0].indexOf("\nnock('expensecat.iriscouch.com')\n  .post('/, \"ABCDEF\"')\n  .reply("), 0);
      t.end();
    }