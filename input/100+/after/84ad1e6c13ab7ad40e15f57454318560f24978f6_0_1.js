function contains(position) {
        for (var ipos = 0; ipos < positions.length; ipos++)
          if (position.values.length == positions[ipos].values.length) {
            var ok = true;
            for (var ival = 0; ival < position.values.length && ok; ival++) {
              if (position.values[ival].axisId != positions[ipos].values[ival].axisId ||
                  position.values[ival].id != positions[ipos].values[ival].id)
                ok = false;
            }
            if (ok)
              return true;
          }
        return false;
      }