function(paragraph){
            if(!/(u|o)l/i.test(paragraph.nodeName)){ // ignore lists
              paragraph = $('<' + target.value + '>')
                .addClass(paragraph.className).append(paragraph.childNodes);
            }
            return paragraph;
          }