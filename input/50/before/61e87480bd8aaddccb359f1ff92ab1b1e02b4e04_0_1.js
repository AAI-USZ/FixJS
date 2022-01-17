function( array ){
    var max = array[0];
    for (var i = 0; i < array.length; i ++)
      if (max < array[i])
        max = array[i];
    return max;
    //return Math.max.apply( Math, array );
}