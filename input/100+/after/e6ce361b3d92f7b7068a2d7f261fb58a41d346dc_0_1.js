function(obj, attr) {
  var arr = [];

  var attr = attr || '';

  if(  typeof obj == 'string'
    || typeof obj == 'number'
    || typeof obj == 'boolean') {

    if (attr == 'base') {
      return [obj];
    }

    return ['' + attr + ' ' + obj];
  }

  for(var k in obj) {
    // console.log(k);
    if(obj.hasOwnProperty(k)) {
      // Inherit parent attribute names when property key
      // is a numeric string; how we deal with arrays
      attr = (parseInt(k).toString() == k) ? attr : k;
      var children = R.flattenErrors(obj[k], attr);
      for(var i=0, l=children.length; i < l; ++i) {
        arr.push(children[i]);
      }
    }
  }

  return arr;
}