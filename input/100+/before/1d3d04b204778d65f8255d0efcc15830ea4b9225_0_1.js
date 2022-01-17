function() {
        var blockId = $(this).attr(mqBlockId),
          block = blockId && MathElement[blockId],
          cursor = block && block.cursor;

        if (cursor) {
          cursor.show();
          if (/^\\[a-z]+$/i.test(latex)) {
            if (cursor.selection) {
              //gotta do cursor before cursor.selection is mutated by 'new cmd(cursor.selection)'
              cursor.prev = cursor.selection.prev;
              cursor.next = cursor.selection.next;
            }
            cursor.insertCmd(latex.slice(1), cursor.selection);
            delete cursor.selection;
          }
          else
            cursor.insertCh(latex);
          cursor.hide().parent.blur();
        }
      }