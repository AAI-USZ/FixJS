function() {
  var template_text = $(".template_text");
  if (template_text.size() >0) { create_editor(template_text) };
  if ($('.diffMode').size() >0) {
    set_diff_mode(template_text);
  } else {
    set_edit_mode(template_text);
  }

  $(".template_file").on("change", function(){
       if ($(".template_file").val() != ""){
         $("#edit_template_tab").hide();
         $("#history_tab").hide();
         $(".template_file").addClass('btn-success');
       }
  })

  $(".clear_file").on("click", function(){
    $(".template_file").val("");
    $("#edit_template_tab").show();
    $("#history_tab").show();
    $(".template_file").removeClass('btn-success');
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