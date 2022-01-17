function(editor, target) {
          var dialog, callback, titleString, href, r, match;
          
          callback = {
            submit: function(title,uri){
              textileMode.replaceSelection(editor, "\"" + title + "\":" + uri);
            },
            remove: function(){
              textileMode.replaceSelection(editor, match[1]);
            },
            close: function(){
              textileMode.updatePreview(editor);
              editor.checkState();
            }
          };

          if(/ on$/.test(target.className)){
            dialog = ME.dialog.link(['Update','Remove','Cancel']);
            href = editor.currentNodes.a.attributes.href;

            match = scanForMatch(editor, new RegExp('\"([^\"]*)\":'+href,'g'));
            titleString = match[1];
            dialog.val('input.uri', href);
          }
          else {
            dialog = ME.dialog.link(['Create','Cancel']);
            titleString = firstLine(editor, " ");
          }
          
          if(!/^\s*$/.test(titleString)){
            dialog.val('.title', titleString);
          }
          
          dialog.dialog('open', callback);
        }