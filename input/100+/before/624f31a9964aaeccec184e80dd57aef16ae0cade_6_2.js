function(){
  var editor = $("div.markupClick.textile").click().parent();

  module("Markup");
  
  test("click and load", function(){
    ok(editor.find(".preview")[0], "Editor should be initialized");
  });

  test("save and close buttons should be visible on div-loaded MarkupEditor", function(){
    var ta = editor.find(".toolbar");
    ok(ta.find("a.save").is(":visible"), "save button should be visible");
    ok(ta.find("a.close").is(":visible"), "close button should be visible");
  });

  test("save and close buttons should not be visible on textarea loaded MarkupEditor", function(){
    ok(!$("#textile a.save").is(":visible"), "save button should not be visible");
    ok(!$("#textile a.close").is(":visible"), "close button should not be visible");
  });

  test('change between preview and data should work', function(){
    var previewButton = editor.find('a.wysiwyg');
    previewButton.mouseup();
    ok(!previewButton.is('.on'), 'preview off');
    previewButton.mouseup();
    ok(previewButton.is('.on'), 'preview on');
  });

  test('should not raise error', function(){
    editor.find('.toolbar').mouseup();
    ok(true, 'should not raise error');
  });

  test('close and reopen', function(){
    var div = editor.find(".preview");
    editor.find('a.close').mouseup();
    ok(div.parent()[0] !== editor[0], 'editor should be closed');
    ok(!div.data('events') || !div.data('events').keyup, 'events should be removed');
    ok(div.attr('contentEditable') === 'false', 'content should no longer be editable');
    div.click();
    ok(div.attr('contentEditable') === 'true', 'editor should be reopened');
    ok(div.parent().find("a.save").is(":visible"), "settings should be remembered");
  });

}