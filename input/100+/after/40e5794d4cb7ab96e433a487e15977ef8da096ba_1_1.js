function(pta,ptb) {
      var a,b,c;
      if (ptb===undef) {
          a = pta[0];
          b = pta[1];
          c = pta[2];
      } else {
          a = ptb[0]-pta[0];
          b = ptb[1]-pta[1];
          c = ptb[2]-pta[2];
      }
      return Math.sqrt((a*a) + (b*b) + (c*c));
    }