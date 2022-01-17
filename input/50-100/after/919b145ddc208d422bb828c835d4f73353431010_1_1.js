function(offset, line, column, v) {
                  var key = new CS.String(v.memberName).r(v.memberName).p(line, column + 1)
                  return new CS.ObjectInitialiserMember(key, v).r(v.raw).p(line, column);
                }