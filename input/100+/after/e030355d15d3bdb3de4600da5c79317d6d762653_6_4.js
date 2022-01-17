function(leftOp, rightOp) {
      var k, l, l_, newLeftOp, newRightOp, nextC, r, r_, rightComponent, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1;
      checkValidOp(leftOp);
      checkValidOp(rightOp);
      newRightOp = [];
      for (_i = 0, _len = rightOp.length; _i < _len; _i++) {
        rightComponent = rightOp[_i];
        newLeftOp = [];
        k = 0;
        while (k < leftOp.length) {
          nextC = [];
          transformComponentX(leftOp[k], rightComponent, newLeftOp, nextC);
          k++;
          if (nextC.length === 1) {
            rightComponent = nextC[0];
          } else if (nextC.length === 0) {
            _ref = leftOp.slice(k);
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              l = _ref[_j];
              append(newLeftOp, l);
            }
            rightComponent = null;
            break;
          } else {
            _ref1 = transformX(leftOp.slice(k), nextC), l_ = _ref1[0], r_ = _ref1[1];
            for (_k = 0, _len2 = l_.length; _k < _len2; _k++) {
              l = l_[_k];
              append(newLeftOp, l);
            }
            for (_l = 0, _len3 = r_.length; _l < _len3; _l++) {
              r = r_[_l];
              append(newRightOp, r);
            }
            rightComponent = null;
            break;
          }
        }
        if (rightComponent != null) {
          append(newRightOp, rightComponent);
        }
        leftOp = newLeftOp;
      }
      return [leftOp, newRightOp];
    }