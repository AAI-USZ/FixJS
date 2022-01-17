function(text) {
        if (all) {
          cm.operation(function() {
            for (var cursor = cm.getSearchCursor(query); cursor.findNext();) {
              if (typeof query != "string") {
                var match = cm.getRange(cursor.from(), cursor.to()).match(query);
                cursor.replace(text.replace(/\$(\d)/, function(w, i) {return match[i];}));
              } else cursor.replace(text);
            }
          });
        } else {
          clearSearch(cm);
          var cursor = cm.getSearchCursor(query, cm.getCursor());
          function advance() {
            var start = cursor.from(), match;
            if (!(match = cursor.findNext())) {
              cursor = cm.getSearchCursor(query);
              if (!(match = cursor.findNext()) ||
                  (cursor.from().line == start.line && cursor.from().ch == start.ch)) return;
            }
            cm.setSelection(cursor.from(), cursor.to());
            confirmDialog(cm, doReplaceConfirm, "Replace?",
                          [function() {doReplace(match);}, advance]);
          }
          function doReplace(match) {
            cursor.replace(typeof query == "string" ? text :
                           text.replace(/\$(\d)/, function(w, i) {return match[i];}));
            advance();
          }
          advance();
        }
      }