function checkConversionFromHTML(html, result){
    textile.click('.wysiwyg')
      .find('.preview').html(html);
    textile.click('.wysiwyg');
    equal(textArea.val(),result);
  }