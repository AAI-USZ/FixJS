function () {
       var hoge = {
         hoge: function () {
           return 'hoge';
         }
       };
       return expect(ensure(hoge, HogeInterface)).to_eq(true);
     }