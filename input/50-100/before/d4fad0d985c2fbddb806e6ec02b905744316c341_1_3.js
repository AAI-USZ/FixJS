function(range) {
        var newRange, position, tmpSpan;
        tmpSpan = jQuery("<span/>");
        newRange = document.createRange();
        newRange.setStart(range.endContainer, range.endOffset);
        newRange.insertNode(tmpSpan.get(0));
        position = {
          top: tmpSpan.offset().top,
          left: tmpSpan.offset().left
        };
        tmpSpan.remove();
        return position;
      }