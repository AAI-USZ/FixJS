function() {
      var result = subject._findElement('myThing', true);

      assert.equal(result[0], expected);
      assert.equal(subject._myThingElement[0], expected);
    }