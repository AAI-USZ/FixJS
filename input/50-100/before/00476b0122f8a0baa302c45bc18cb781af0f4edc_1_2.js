function(u, i) {
              var value = set[u.unit], fraction = value % 1;
              if(fraction) {
                set[DateUnitsReversed[i].unit] = (fraction * (u.unit === 'second' ? 1000 : 60)).round();
                set[u.unit] = value | 0;
              }
            }