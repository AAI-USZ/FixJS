function( array ){
    var min = array[0];
    for (var i = 0; i < array.length; ++i)
      if (min > array[i])
        min = array[i];
    return min;
    //return Math.min.apply( Math, array );
}