function(a, b) {
            var aSpan = data.spans[a];
            var bSpan = data.spans[b];
            var tmp = aSpan.from + aSpan.to - bSpan.from - bSpan.to;
            if (tmp) {
              return tmp < 0 ? -1 : 1;
            }
            return 0;
          }