function(index, elem) {
          console.log(elem);
          elem.contentEditable = false;
          return widget._initDraggable(elem, editable);
        }