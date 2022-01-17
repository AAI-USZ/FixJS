function() {
        that.emit('destroy', my.process, my.type, my.stat);
        my.element.remove();
      }