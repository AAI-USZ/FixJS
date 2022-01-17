function() {
    return {
      foo: 'bar',
      apple: {banana: 'smoothie'},
      currentFruit: function() {
        return 'guava';
      },
      currentCountry: function() {
        return {name: 'Iceland',
                _pop: 321007,
                population: function() {
                  return this._pop;
                },
                unicorns: 0, // falsy value
                daisyGetter: function() {
                  return this.daisy;
                }
               };
      }
    };
  }