function(e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          console.log(e.type);
          return e.stopPropagation();
        }
      }