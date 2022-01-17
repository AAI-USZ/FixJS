function(d,i) {
              return d && (scale(d) < 10 || scale(d) > scale.range()[0] - 10); // 10 is assuming text height is 16... if d is 0, leave it!
            }