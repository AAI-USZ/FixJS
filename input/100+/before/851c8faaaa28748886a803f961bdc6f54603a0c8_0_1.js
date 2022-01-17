function(btn)
    {
    var self = this, lang = domiwyg.lang, 
      element = self.getSelectedAreaElement(), 
      node_name = null;

    if (element)
      {
      node_name = element.nodeName.toLowerCase();
      self.storeCursor();

      domiwyg.showDialog('<h1>' + lang.create_link + '</h1>'
        + '<p>Bläddra dig fram till den interna sida du vill länka till.</p><p id="dw_KWE_cd">/</p><ul id="dw_KWE_page_browser"></ul>'
        + '<p><input type="hidden" id="dw_link_protocol" value="" /><input type="text" id="dw_link_url" value="" /></p>'
        + '<p>' + lang.info_link_delete + '</p>'
        + '<p><button id="btn_create_link" class="hide-dialog">' + lang.ok + '</button> <button class="hide-dialog">' + lang.cancel + '</button></p>', btn);

      kwe.KWElinkBrowse('');

      if (node_name)
        {
        if (node_name != 'a')
          element = null;

        addEvent(elem('btn_create_link'), 'click', function()
          {
          elem('dw_link_url').value = Kwf.MODR_SITE + elem('dw_link_url').value + '/';
          self.createLink(element);
          });
        }
      else
        {
        domiwyg.hideDialog();
        }
      }
    }