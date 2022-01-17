function(editor, mode, target) {
          eachParagraph(mode, function(paragraph) {
            if(/^\w+(\([\w ]+\))?\./.test(paragraph)) {
              return paragraph.replace(/^\w+(\([\w ]+\))?\.\s+/, target.value + "$1. ");
            } else if(/^[\*#] /.test(paragraph)){ // ignore lists
              return paragraph;
            } else {
              return target.value + ". " + paragraph;
            }
          });
        }