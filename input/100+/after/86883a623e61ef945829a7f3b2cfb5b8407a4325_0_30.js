function advanceMarks() {
          var m;
          while (markpos < marked.length &&
                 ((m = marked[markpos]).from == pos || m.from == null)) {
            if (m.style != null) marks.push(m);
            ++markpos;
          }
          nextChange = markpos < marked.length ? marked[markpos].from : Infinity;
          for (var i = 0; i < marks.length; ++i) {
            var to = marks[i].to;
            if (to == null) to = Infinity;
            if (to == pos) marks.splice(i--, 1);
            else nextChange = Math.min(to, nextChange);
          }
        }