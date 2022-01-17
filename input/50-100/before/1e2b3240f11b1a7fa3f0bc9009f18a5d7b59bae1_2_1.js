function(elems) {
  if (!elems) return '';

  var ret = '',
      len = elems.length,
      elem;

  for(var i = 0; i < len; i ++) {
    elem = elems[i];
    if(elem.type === 'text') ret += entities.decode(elem.data, 2);
    else if(elem.children && elem.type !== 'comment') {
      ret += text(elem.children);
    }
  }

  return ret;
}