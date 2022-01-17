function(){
      var ties = '{', key;

      var i = options.tie.length,
          comma = '';
      while( i -- ){
        ties += comma + '"'+ options.tie[i].pkg + '": ' + options.tie[i].obj;
        comma = ', ';
      }

      ties += '}';

      return ties;
    }