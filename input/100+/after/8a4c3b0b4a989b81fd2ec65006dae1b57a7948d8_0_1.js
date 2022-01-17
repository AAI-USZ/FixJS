function normalizeParameters(list) {
  var args = { }, i = 0, type;
  args.key = list.shift();
  for(; i < list.length; i += 1) {
    type = typeof list[i];
    if (type === 'function') {
      args.callback = list[i];
    } else if (type === 'object' && !Array.isArray(list[i])) {
      args.options = list[i];
    } else {
      if(i === 0){args.column = list[i];}
      if(i === 1){args.subcolumn = list[i];}
    }
  }
  return args;
}