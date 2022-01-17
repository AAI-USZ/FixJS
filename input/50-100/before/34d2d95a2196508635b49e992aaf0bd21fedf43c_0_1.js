function(){
      var ties = {}, key;

      var i = options.tie.length;
      while( i -- ){
        ties[ options.tie[i].pkg ] = options.tie[i].obj;
      }

      return JSON.stringify(ties);
    }