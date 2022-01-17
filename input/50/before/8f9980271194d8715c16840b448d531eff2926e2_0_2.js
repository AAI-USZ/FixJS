function() {
      formatter.format({ text: 'Foo', done: false }, 0).should.eql('     #1  \u001b[31m✖\u001b[39m  Foo');
    }