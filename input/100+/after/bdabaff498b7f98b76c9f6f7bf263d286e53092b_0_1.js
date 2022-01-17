function () {
      var arr = [ Math.random(), Math.random(), Math.random(), Math.random() ];
      var doSomeStuff;

      doSomeStuff = function (x) { return x * x; };

      var funcs = answers.makeClosures(arr, doSomeStuff);
      expect(funcs).to.have.length(arr.length);

      for(var i = 0; i< arr.length; i++) {
        expect(funcs[i]()).to.be(doSomeStuff(arr[i]));
      };
    }