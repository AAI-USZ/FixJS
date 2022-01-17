function __bind(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }