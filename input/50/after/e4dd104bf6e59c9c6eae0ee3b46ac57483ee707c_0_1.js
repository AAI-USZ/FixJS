function (val) { 
      $(self)
        .text(val)
        .addClass('editable')
        .one('click', editableClick);
    }