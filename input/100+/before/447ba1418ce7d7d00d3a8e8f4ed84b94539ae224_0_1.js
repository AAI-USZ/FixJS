function (state, action, editor, session, text) {
          if (text == "\n") {
              var cursor = editor.getCursorPosition();
              var line = session.doc.getLine(cursor.row);
              var rightChars = line.substring(cursor.column, cursor.column + 2);
              if (rightChars == '</') {
                  var indent = this.$getIndent(session.doc.getLine(cursor.row)) + session.getTabString();
                  var next_indent = this.$getIndent(session.doc.getLine(cursor.row));

                  return {
                      text: '\n' + indent + '\n' + next_indent,
                      selection: [1, indent.length, 1, indent.length]
                  }
              }
          }
          return false;
      }