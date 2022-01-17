function(editor, mode, target) {
          var dialog, callback, titleString, href, r, match;
          
          callback = {
            submit: function(title,uri){
              mode.replaceSelection("\"" + title + "\":" + uri);
            },
            remove: function(){
              mode.replaceSelection(match[1]);
            },
            close: function(){
              mode.updatePreview();
              editor.checkState();
            }
          };

          if(/ on$/.test(target.className)){
            dialog = ME.dialog.link(['Update','Remove','Cancel']);
            href = currentNodes.a.attributes.href;

            match = scanForMatch(mode,new RegExp('\"([^\"]*)\":'+href,'g'));

            titleString = match[1];
            dialog.val('input.uri', href);
          }
          else {
            dialog = ME.dialog.link(['Create','Cancel']);
            titleString = firstLine(mode);
          }
          
          if(!/^\s*$/.test(titleString)){
            dialog.val('.title', titleString);
          }
          
          dialog.dialog('open', callback);
        }