function(name){
  var name, i, temp, __ref;
  name || (name = 'ref');
  i = 0;
  do {
    temp = '__' + (name.length > 1
      ? name + (i++ || '')
      : (i++ + parseInt(name, 36)).toString(36));
  } while ((__ref = this.variables[temp + "."]) != 'reuse' && __ref != void 8);
  return this.add(temp, 'var');
}