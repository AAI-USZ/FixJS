function Toolbar(editor) {

    // init Toolbar Items
    var button, buttonTags = '',
    toolbarDiv = $("<div class=\"toolbar\"></div>"),
    that = this;

    this.div = toolbarDiv;

    toolbarDiv.html(getToolbarHTML());

    toolbarDiv.mouseup(function(e) { // Trigger on button click
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
    }).change(function(e) { // trigger on select change
      var target = e.target;
      that.runAction(editor, target.className, target);
      return false;
    }).click(function(e){return false; }); //
  }