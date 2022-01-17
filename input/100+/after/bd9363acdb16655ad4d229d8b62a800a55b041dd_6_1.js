function(){
    var otherEditor = $("div.markupClick.textile").parent(),
    w2 = new WysiwygHelper({
      form: otherEditor,
      textArea: otherEditor.find('textarea'),
      preview: otherEditor.find('.preview'),
      selection: selection,
      range: range
    });

    w2.set('othertext\n\nsecond paragraph');
    w.set('text')
      .select('p');
    w2.click('.bold');
    w.notMatch('b')
      .match('p');
    w.set('text')
      .select('p');
    w2.change(".formatBlock", "h1");
    w.notMatch('h1')
      .match('p');
    w2.match('p')
      .match('h1');
  }