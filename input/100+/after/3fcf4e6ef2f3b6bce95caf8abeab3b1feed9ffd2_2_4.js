function(editor, target) {
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

              textileMode.replaceSelection(editor, replacement);
            },
            remove: function(){
              textileMode.replaceSelection(editor, "");
            },
            close: function(){
              textileMode.updatePreview(editor);
              editor.checkState();
            }
          };
          
          if(/ on$/.test(target.className)){
            dialog = ME.dialog.insertImage(['Update','Remove','Cancel']);
            src = editor.currentNodes.img.attributes.src;

            scanForMatch(editor, new RegExp('!' + src + "(\\([^\\)]*\\))?!(:[^ \n]*)?",'g'));
            
            if(editor.currentNodes.a){
              href = editor.currentNodes.a.attributes.href;
            }
            dialog.val('input.uri', href);
            dialog.val('input.imageUri', src);
            dialog.val('input.title', editor.currentNodes.img.attributes.title);
          }
          else {
            dialog = ME.dialog.insertImage(['Create','Cancel']);
            firstLine(editor, " ");
          }

          dialog.dialog('open', callback);
        }