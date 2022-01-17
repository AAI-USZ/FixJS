function() {
      var emoticon = $(this).find('span').text();
      var textbox = $(this).parents('form').find('textarea#Form_Body');
      var txt = $(textbox).val();
      if (txt != '')
        txt += ' ';
      $(textbox).val(txt + emoticon + ' ');
      var container = $(this).parents('.EmoticonContainer');
      $(container).hide();
      $(container).prev().removeClass('EmotifyDropdownActive');
      
      // If cleditor is running, update it's contents
      var ed = $(textbox).get(0).editor;
      if (ed) {
        // Update the frame to match the contents of textarea
        ed.updateFrame();
        // Run emotify on the frame contents
        var Frame = $(ed.$frame).get(0);
        var FrameBody = null;
        var FrameDocument = null;
        
        // DOM
        if (Frame.contentDocument) {
           FrameDocument = Frame.contentDocument;
           FrameBody = FrameDocument.body;
        // IE
        } else if (Frame.contentWindow) {
           FrameDocument = Frame.contentWindow.document;
           FrameBody = FrameDocument.body;
        }
        $(FrameBody).html(emotify($(FrameBody).html()));
        var webRoot = gdn.definition('WebRoot', '');
        var ss = document.createElement("link");
        ss.type = "text/css";
        ss.rel = "stylesheet";
        ss.href = gdn.combinePaths(webRoot, 'plugins/Emotify/emotify.css');
        if (document.all)
           FrameDocument.createStyleSheet(ss.href);
        else
           FrameDocument.getElementsByTagName("head")[0].appendChild(ss);
      }

      return false;
    }