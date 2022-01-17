function() {
  var template_text = $(".template_text");
  if ($.browser.msie && $.browser.version.slice(0,1) < 10) {
    $('.subnav').hide();
    if ($('.diffMode').size() >0) {
      IE_diff_mode(template_text);
    }
  }else{
    if (template_text.size() >0 ) { create_editor(template_text) };
    if ($('.diffMode').size() >0) {
      set_diff_mode(template_text);
    } else {
      set_edit_mode(template_text);
    }
  }

  $(".template_file").on("change", function(evt){
    if ($(".template_file").val() == "") return;

    if(window.File && window.FileList && window.FileReader)
    {
      var answer = confirm("You are about to override the editor content, Are You Sure?")
      if (!answer) { $('.template_file').val(""); return;}

      var files = evt.target.files; // files is a FileList object
      for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onloadend = function(evt) {
          if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            $('#new').text(( evt.target.result));
            set_edit_mode($('.template_text'));
          }
        };
        // Read in the file as text.
        reader.readAsText(f);
        $('.template_file').val("");
      }
    }else{
      //Set editor in read only mode
      $editor.setTheme("ace/theme/clouds");
      $editor.setReadOnly(true);
    }

  })

  $("#keybinding").on("change", function() {
    var vim = require("ace/keyboard/keybinding/vim").Vim;
    var emacs = require("ace/keyboard/keybinding/emacs").Emacs;
    var keybindings = {
      Default: null, // Null = use "default" keymapping
      Vim: vim,
      Emacs: emacs};

    $editor.setKeyboardHandler(keybindings[$("#keybinding").val()]);
  })
}