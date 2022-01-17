function(other) {
  var glyphPos = this.getBBox();
  var v1 = other.end - glyphPos.end;
  var v2 = other.end - glyphPos.start;
  var v3 = other.start - glyphPos.end;
  var v4 = other.start - glyphPos.start;
  return (!((v1>0 && v2>0 && v3>0 && v4>0) || (v1<0 && v2<0 && v3<0 && v4<0)));
}