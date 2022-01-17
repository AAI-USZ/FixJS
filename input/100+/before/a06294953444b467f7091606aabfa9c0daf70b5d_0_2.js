function revert_template(item){
  var answer = confirm("You are about to override the editor content with a previous version, Are You Sure?")
  if (!answer) return;

  var version = $(item).attr('data-version');
  var url = $(item).attr('data-url');
  $.ajax({
      type: 'get',
      url:  url,
      data:'version=' + version,
      complete: function(res) {
        $editor.getSession().setValue(res.responseText);
        $('#edit_template_tab').click();
        var time = $(item).closest('div.row').find('h6 span').attr('data-original-title');
        $('#config_template_audit_comment').text("Revert to revision from: " + time)
    }
  })
}