function Editor(textArea, settings) {
    var editor = this, timer = 0, htmlDiv = settings.htmlDiv;

    this.setDataType(textArea.attr("class"));
    this.settings = settings;

    if(!this.dataType) { return ;}

    function addKeyListeners(object, isTextarea){
      object.keydown(function(e){
        if(isTextarea || editor.is('wysiwyg')){
          return editor.currentMode.pressed(editor, e.keyCode);
        }
      }).keyup(function(e){
        if(isTextarea || editor.is('wysiwyg')){
          return editor.currentMode.released(editor, e.keyCode);
        }
      }).mouseup(function(){
        if(isTextarea || editor.is('wysiwyg')){
          editor.focus();
          return editor.currentMode.clicked(editor);
        }
      });
    }

    // mouseup will catch all three mouse buttons. Since all keys move
    // the cursor a check is necessary
    this.textArea = textArea.bind("mouseup keyup", function() {
      editor.checkState();
      clearTimeout(timer);
      timer = setTimeout(function(){
        editor.currentMode.updatePreview(editor);
      },1000);
    });
    addKeyListeners(textArea,true);

    if(htmlDiv){
      htmlDiv.addClass('preview');
    } else {
      htmlDiv = $("<div class=\"preview\"></div>");
    }
    this.htmlDiv = htmlDiv.bind("mouseup keyup", function() {
        if(editor.is("wysiwyg")) {
          editor.checkState();
        }
      });
    addKeyListeners(this.htmlDiv);
    
    this.toolbar = new Toolbar(this);
    this.container = textArea.wrap("<div class=\"markupEditor\"></div>")
      .parent().append(editor.htmlDiv).
      prepend(this.toolbar.div);
    textArea.wrap("<div class=\"textarea\">");

    activeEditors[numberOfEditors] = editor;
    editor.id = numberOfEditors;
    // console.log("init editor " + numberOfEditors);
    numberOfEditors ++;
  }