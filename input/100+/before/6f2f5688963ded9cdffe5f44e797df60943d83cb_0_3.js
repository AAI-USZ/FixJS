function() {
      var $el = $(this),
          container = createEditorContainer($el);

      // init hidden editors off-screen so they work
      if(container.is(':hidden')){
        container.wrap('<div id="' + container.attr('id') + '_wrap" class="ace-editor-replaceme"></div>');
        $('body').append(container.css({
          'position': 'absolute',
          'left': '-9999px'
        }).remove());
      };

      var editor = ace.edit(container.attr("id")),
          HtmlMode = require("ace/mode/html").Mode,
          editorSession = editor.getSession();

      $el.hide();
      editorSession.setMode(new HtmlMode());
      editorSession.setValue($el.val());
      editorSession.setTabSize(2);
      editorSession.setUseSoftTabs(true);
      editorSession.on('change', function() {
        $el.val(editorSession.getValue());
      });
      editor.setShowPrintMargin(false);
    }