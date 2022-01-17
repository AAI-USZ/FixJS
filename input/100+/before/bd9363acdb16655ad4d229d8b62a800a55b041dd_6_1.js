function(){
    var otherEditor = $("div.markupClick.textile").parent(),
    w2 = new WysiwygHelper({
      form: otherEditor,
      textArea: otherEditor.find('textarea'),
      preview: otherEditor.find('.preview'),
      selection: selection,
      range: range
    });
    w.set('text')
      .select('p');
    w2.click('.bold');
    w.notMatch('b');
    w.set('text')
      .select('p');
    w2.change(".formatBlock", "h1");
    w.notMatch('h1');
  }