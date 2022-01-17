function align(mode, orientation) {
    eachParagraph(mode, function(paragraph) {
      var classes, classesLength, newClasses = [];
      if(/^\w+\([^)]+\)\./.test(paragraph)) {
        classes = jQuery.trim(paragraph.slice(paragraph.indexOf("(") + 1, paragraph.indexOf(")"))).split(/\s+/);
        classesLength = classes.length;
        for(i=0 ; i < classesLength ; i++ ){
          if(classes[i] != 'right' && classes[i] != 'left' && classes[i] != 'center'){
            newClasses.push(classes[i]);
          }
        }
        newClasses.push(orientation);
        return paragraph.replace(/^(\w+)[^.]+.\s+/, "$1(" + newClasses.join(" ") + "). ");
      } else if(/^\w+\./.test(paragraph)) {
        return paragraph.replace(/^(\w+)\.\s*/, "$1(" + orientation + "). ");
      } else {
        return "p(" + orientation + "). " + paragraph;
      }
    });
  }