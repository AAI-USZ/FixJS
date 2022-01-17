function(res){
      var doc = createHTML(res.responseText);
      if(!($X('descendant::div[contains(concat(" ",normalize-space(@class)," ")," userbox ")]', doc)[0])){
        throw new Error(chrome.i18n.getMessage('error_notLoggedin', self.name));
      }
      var form = formContents($X('descendant::form[@action="/gists"]', doc)[0]);
      var content;
      switch(ps.type){
        case 'regular':
          content = ps.description;
          break;
        case 'quote':
          content = joinText([ps.body, '', ps.itemUrl, '', ps.description], '\n\n');
          break;
      }
      form['file_contents[gistfile1]'] = content;
      form['file_name[gistfile1]'] = ps.item;
      // public
      delete form['action_button'];
      return request(self.LINK+'gists', {
        sendContent: form
      });
    }