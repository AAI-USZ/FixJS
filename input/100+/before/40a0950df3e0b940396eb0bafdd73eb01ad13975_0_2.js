function(blanks, depth) {
            var i, _ref;
            alert(index);
            alert(depth);
            if (depth >= index.length) {
              for (i = 0, _ref = depth - index.length; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
                index.push(0);
              }
            }
            index[depth]++;
            return "\n" + blanks + ("" + index[depth] + ".   ");
          }