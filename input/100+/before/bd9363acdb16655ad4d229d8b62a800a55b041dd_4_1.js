function(){
    var div = editor.find(".preview");
    editor.find('a.close').mouseup();
    ok(div.parent()[0] !== editor[0], 'editor should be closed');
    ok(!div.data('events') || !div.data('events').keyup, 'events should be removed');
    ok(div.attr('contentEditable') === 'false', 'content should no longer be editable');
    div.click();
    ok(div.attr('contentEditable') === 'true', 'editor should be reopened');
    ok(div.parent().find("a.save").is(":visible"), "settings should be remembered");
  }