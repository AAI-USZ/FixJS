f{
  var first = '{"jsonrpc": "1.0", "id":"' + id + '", "method":"' + name + '", '
  var last = '"params": ['
  for (s in send)
  {
    var last = last + s;
  }
  last = last + ']';
  return first + last;
}
