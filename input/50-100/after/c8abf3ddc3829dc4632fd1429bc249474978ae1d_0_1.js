function (){
    var args  = [].slice.call( arguments );
    var i     = 0;
    var j     = args.length;
    var child = {};
    var parent, prop;

    for( ; i < j; i++ ){
      parent = args[ i ];

      for( prop in parent ){
        child[ prop ] = parent[ prop ];
      }
    }

    return child;
  }