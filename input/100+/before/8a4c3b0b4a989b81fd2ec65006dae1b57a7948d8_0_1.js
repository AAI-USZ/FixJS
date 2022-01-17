function normalizeParameters(list) {
  var args = { }, i = 0;
  args.key = list.shift();
  for(; i < list.length; i += 1) {
    switch(typeof list[i]) {
      case 'function':
        args.callback = list[i];
        break;
      case 'object':
        args.options = list[i];
        break;
      default:
        if(i === 0){args.column = list[i];}
        if(i === 1){args.subcolumn = list[i];}
        break;
    }
  }
  return args;
}