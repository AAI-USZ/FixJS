function(sel) {
          var i, num, range, _ref;
          num = sel.rangeCount;
          if (num === 0) return;
          for (i = 0, _ref = num - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
            range = sel.getRangeAt(i);
            sel.setSingleRange(range);
          }
          return beautify(editorBody$);
        }