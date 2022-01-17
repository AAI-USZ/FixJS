function(){

  // If called with name and function arguments

  if(typeof arguments[0] === 'string'){

    var f = arguments[1];

    this.prototype[arguments[0]] = link(f, arguments);

    return;

  }

  // If called with object argument

  for(var name in arguments[0]){

    var f = arguments[0][name];

    this.prototype[name] = link(f, arguments);

  }

}