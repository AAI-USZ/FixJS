function __bind(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }