function(subject, encoding) {
  var length=0;
  for (var i=0, l=subject.length; i<l; ++i) {
    length += utf8toHex(subject.charAt(i)).length;
  }

  return length;
}