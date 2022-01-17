function(dest, c, otherC, side) {
    var cIntersect, intersectEnd, intersectStart, newC, otherIntersect, s;
    checkValidOp([c]);
    checkValidOp([otherC]);
    if (c.i != null) {
      append(dest, {
        i: c.i,
        p: transformPosition(c.p, otherC, side === 'right')
      });
    } else {
      if (otherC.i != null) {
        s = c.d;
        if (c.p < otherC.p) {
          append(dest, {
            d: s.slice(0, otherC.p - c.p),
            p: c.p
          });
          s = s.slice(otherC.p - c.p);
        }
        if (s !== '') {
          append(dest, {
            d: s,
            p: c.p + otherC.i.length
          });
        }
      } else {
        if (c.p >= otherC.p + otherC.d.length) {
          append(dest, {
            d: c.d,
            p: c.p - otherC.d.length
          });
        } else if (c.p + c.d.length <= otherC.p) {
          append(dest, c);
        } else {
          newC = {
            d: '',
            p: c.p
          };
          if (c.p < otherC.p) {
            newC.d = c.d.slice(0, otherC.p - c.p);
          }
          if (c.p + c.d.length > otherC.p + otherC.d.length) {
            newC.d += c.d.slice(otherC.p + otherC.d.length - c.p);
          }
          intersectStart = Math.max(c.p, otherC.p);
          intersectEnd = Math.min(c.p + c.d.length, otherC.p + otherC.d.length);
          cIntersect = c.d.slice(intersectStart - c.p, intersectEnd - c.p);
          otherIntersect = otherC.d.slice(intersectStart - otherC.p, intersectEnd - otherC.p);
          if (cIntersect !== otherIntersect) {
            throw new Error('Delete ops delete different text in the same region of the document');
          }
          if (newC.d !== '') {
            newC.p = transformPosition(newC.p, otherC);
            append(dest, newC);
          }
        }
      }
    }
    return dest;
  }