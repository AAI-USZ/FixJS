function (parent) {
      
      this.inherit(CstyleBehaviour, ["braces", "parens", "string_dquotes"]); // Get string behaviour
      this.parent = parent;
      
//      this.add("brackets", "insertion", function (state, action, editor, session, text) {
//          if (text == "\n") {
//              var cursor = editor.getCursorPosition();
//              var line = session.doc.getLine(cursor.row);
//              var rightChars = line.substring(cursor.column, cursor.column + 2);
//              if (rightChars == '</') {
//                  var indent = this.$getIndent(session.doc.getLine(cursor.row)) + session.getTabString();
//                  var next_indent = this.$getIndent(session.doc.getLine(cursor.row));
//
//                  return {
//                      text: '\n' + indent + '\n' + next_indent,
//                      selection: [1, indent.length, 1, indent.length]
//                  }
//              }
//          }
//          return false;
//      });

      // Check for open tag if user enters / and auto-close it.
//      this.add("slash", "insertion", function (state, action, editor, session, text) {
//        if (text == "/") {
//          var cursor = editor.getCursorPosition();
//        var line = session.doc.getLine(cursor.row);
//        if (cursor.column > 0 && line.charAt(cursor.column - 1) == "<") {
//          line = line.substring(0, cursor.column) + "/" + line.substring(cursor.column);
//          var lines = session.doc.getAllLines();
//          lines[cursor.row] = line;
//          // call mode helper to close the tag if possible
//          parent.exec("closeTag", lines.join(session.doc.getNewLineCharacter()), cursor.row);
//        }
//        }
//      return false;
//      });
  }