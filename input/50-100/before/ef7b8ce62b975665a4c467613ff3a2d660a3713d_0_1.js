function(obj) {
    if( !Util._is_object(obj) || !obj.hasOwnProperty('data') )
      Util._exit('invalid data format - object should have a "data" property');

    if(!(obj.data instanceof Array) || !(obj.data[0] instanceof Array))
      Util._exit('invalid data format - obj.data expected to be array of arrays');

    return obj.data;
  }