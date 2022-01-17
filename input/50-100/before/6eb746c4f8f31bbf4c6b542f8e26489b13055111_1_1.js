function (done) {
      bar.save(function (err, doc) {
        assert.strictEqual(err, null)
        assert.strictEqual(doc.milk.toString(), [
          'foo', 'bar', 'test', 'on', 'two', 'lorem'
        ].toString())
        done()
      })
    }