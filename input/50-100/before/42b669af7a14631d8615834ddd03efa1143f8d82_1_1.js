function () {
      var piyo = {
        hoge: function () { return 'hoge'; },
        huga: function () { return 'huga'; }
      };
      return expect(ensure(piyo, HogeInterface, HugaInterface)).to_eq(undefined);
    }