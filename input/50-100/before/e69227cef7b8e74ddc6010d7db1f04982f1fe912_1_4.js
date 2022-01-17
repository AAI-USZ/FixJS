function(e) {
        var t = e.target;
        t.className = 'to-be-undraggable';
        t.removeAttribute('contentEditable');
        if( that.model.set('name', t.innerHTML) ) {
          that.model.save();
        }
      }