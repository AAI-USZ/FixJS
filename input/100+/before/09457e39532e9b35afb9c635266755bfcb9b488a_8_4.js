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