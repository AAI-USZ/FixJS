function() {
      formatter.format({ text: 'Foo', done: true }, 0).should.eql('      #1  \u001b[32m√\u001b[39m  Foo');
    }