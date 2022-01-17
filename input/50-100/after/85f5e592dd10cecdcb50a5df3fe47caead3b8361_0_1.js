function() {
    var url = document.forms[0].url.value;
    var matches = null;
    if(matches = url.match(/voteit\.com\/v\/([0-9a-zA-Z]+)/)) {
      var embedUrl = 'https://www.voteit.com/v/'+matches[1]+'/embed';
      var code = '<iframe src="'+embedUrl+'" scrolling="no" width="320" height="360" frameBorder="0" style="border:none;"></iframe>';
      tinyMCEPopup.editor.execCommand('mceInsertContent', false, code);
      tinyMCEPopup.close();
    }
    else {
      this.error();
    }
  }