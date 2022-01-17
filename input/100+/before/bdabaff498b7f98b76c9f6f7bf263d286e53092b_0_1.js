function(func, i) {
        expect(funcs[i]()).to.be(doSomeStuff(arr[i]));
      }