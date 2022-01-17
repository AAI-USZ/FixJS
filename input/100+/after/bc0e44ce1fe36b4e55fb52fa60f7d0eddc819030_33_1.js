function() {

    var expected;


    setup(function() {
      var thing = document.createElement('div');
      thing.id = 'foo';
      el.appendChild(thing);
    });

    setup(function() {
      subject.selectors.myThing = '#foo';
      expected = el.querySelector('#foo');
      assert.ok(expected);
    });

    test('single lookup', function() {
      var result = subject._findElement('myThing');

      assert.equal(result, expected);
      assert.equal(subject._myThingElement, expected);
    });

    test('query all', function() {
      var result = subject._findElement('myThing', true);

      assert.equal(result[0], expected);
      assert.equal(subject._myThingElement[0], expected);
    });

  }