function(editor, mode, target) {
          var dialog, linkNode, titleString,
          range = selection.getRangeAt(0),
          callback = {
            remove: function(){
              var text = linkNode.text();
              // on Chrome childNodes does not contain textnodes
              linkNode.replaceWith(text);
            },
            close: function(){
              editor.htmlDiv.focus();
              editor.checkState();
            }
          };
          
          if(/ on$/.test(target.className)){
            linkNode = $(currentNodes.a);
            dialog = ME.dialog.link(['Update','Remove','Cancel']);
            
            callback.submit = function(title,uri){
              linkNode.attr('href',uri).text(title);
              
              // Firefox start
              range.selectNodeContents(linkNode[0]);
              selection.removeAllRanges();
              selection.addRange(range);
              // Firefox end
            };
            titleString = linkNode.text();
            dialog.val('input.uri', linkNode.attr('href'));
          }
          else {
            dialog = ME.dialog.link(['Create','Cancel']);
            
            callback.submit = function(title,uri){
              var newNode = $("<a href=\"" + uri + "\">" + title + "</a>")[0];
              range.deleteContents();
              range.insertNode(newNode);
              
              range.selectNodeContents(newNode);
              selection.removeAllRanges();
              selection.addRange(range);
            };

            titleString = range.toString();
          }

          if(!/^\s*$/.test(titleString)){
            dialog.val('.title', titleString);
          }
          
          dialog.dialog('open', callback);
        }