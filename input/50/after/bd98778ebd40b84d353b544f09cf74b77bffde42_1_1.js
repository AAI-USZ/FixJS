function to fetch data', function() {
      var times = 0;
      var bento = new Bento(function(page, memo) {
        times++;
      });
      expect(times).toEqual(1)
      bento.load(1);        
      expect(times).toEqual(2)
      bento.load(2);        
      expect(times).toEqual(3)
    }