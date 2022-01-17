function(e) { // Trigger on button click
      var target = e.target;

      if((/(a|span)/i).test(target.nodeName)) {
        // When the span is clicked change the Target to the
        // containing div
        if(/span/i.test(target.nodeName)) {
          target = target.parentNode;
        }
        if(target.disabled){
          // TODO handle focus somewhere
          if(editor.is('wysiwyg')){
            editor.htmlDiv.focus();
          } else {
            editor.textArea.focus();
          }
          return false;
        }
        var action = target.className;

        action = action.split(" ")[0];
        that.runAction(editor, action, target);
        // TODO this does not work with dialogs
        // in dialogs this gets set manually, but perhaps there is a
        // more general way?
        editor.checkState();
      }
    }