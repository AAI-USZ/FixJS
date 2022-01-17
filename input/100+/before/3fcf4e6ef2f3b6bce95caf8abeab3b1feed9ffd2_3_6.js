function(editor, mode, target) {
          var paragraph, newParagraphs = [], tag;

          getParagraphs().replaceWith(function(){

            if(/(u|o)l/i.test(this.nodeName)){ // ignore lists
              // TODO update jquery and try returning the list. File
              // bug when it won't work
              tag = this.nodeName;
            } else {
              tag = target.value;
            }
            paragraph = $('<' + tag + '>')
              .addClass(this.className).append(this.childNodes);
            newParagraphs.push(paragraph[0]);
            return paragraph;
          });
          selectNodes(newParagraphs);
        }