function(editor, mode, target) {
          var dialog, callback, href, src, r;

          callback = {
            submit: function(imageUri,title,uri){
              var replacement = imageUri;
              if(title && !/^\s*$/.test(title)){
                replacement = replacement + "(" + title + ")";
              }
              replacement = "!" + replacement + "!";
              if(uri && !/^\s*$/.test(uri)){
                replacement = replacement + ":" + uri;
              }

              mode.replaceSelection(replacement);
            },
            remove: function(){
              mode.replaceSelection("");
            },
            close: function(){
              mode.updatePreview();
              editor.checkState();
            }
          };
          
          if(/ on$/.test(target.className)){
            dialog = ME.dialog.insertImage(['Update','Remove','Cancel']);
            src = currentNodes.img.attributes.src;

            scanForMatch(mode, new RegExp('!' + src + "(\\([^\\)]*\\))?!(:[^ \n]*)?",'g'));
            
            if(currentNodes.a){
              href = currentNodes.a.attributes.href;
            }
            dialog.val('input.uri', href);
            dialog.val('input.imageUri', src);
            dialog.val('input.title', currentNodes.img.attributes.title);
          }
          else {
            dialog = ME.dialog.insertImage(['Create','Cancel']);
            firstLine(mode);
          }

          dialog.dialog('open', callback);
        }