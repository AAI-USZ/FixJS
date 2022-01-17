function(editor, target) {
          var dialog, callback, linkNode,
          selection = window.getSelection(),
          range = selection.getRangeAt(0);

          callback = {
            submit: function(imageUri,title,uri){
              var imageNode = $("<img src=\"" + imageUri + "\"/>"), parentNode = imageNode;
              if(!/^\s*$/.test(title)){
                imageNode.attr({alt: title, title: title});
              }

              if(!/^\s*$/.test(uri)){
                parentNode = $("<a href=\"" + uri + "\"/>").append(imageNode);
              }
              
              range.deleteContents();
              range.insertNode(parentNode[0]);
              
              range.selectNode(imageNode[0]);
              selection.removeAllRanges();
              selection.addRange(range);
            },
            remove: function(){
              imageNode.remove();
            },
            close: function(){
              editor.htmlDiv.focus();
              editor.checkState();
            }
          };

          if(/ on$/.test(target.className)){
            dialog = ME.dialog.insertImage(['Update','Remove','Cancel']);
            if(editor.currentNodes.a){
              linkNode = $(editor.currentNodes.a);
              dialog.val('input.uri', linkNode.attr('href'));
              range.selectNode(editor.currentNodes.a);
            }
            imageNode = $(editor.currentNodes.img);

            dialog.val('input.imageUri', imageNode.attr('src'));
            dialog.val('input.title', imageNode.attr('title'));
          }
          else {
            dialog = ME.dialog.insertImage(['Create','Cancel']);
          }

          dialog.dialog('open', callback);
        }