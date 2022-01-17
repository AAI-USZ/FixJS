function(btn)
        {
        var self = this, lang = domiwyg.lang;

        if (self.getSelectedAreaElement())
          {
          self.storeCursor();

          domiwyg.showDialog('<h1>' + lang.insert_image + '</h1>'
            + '<p>Bläddra dig fram till den bildfil du vill infoga.</p><p id="dw_KWE_cd">/</p><ul id="dw_KWE_image_browser"></ul>'
            + '<p>' + lang.image_url + ': <input type="text" id="dw_img_url" value="" /></p>'
            + '<p><button id="btn_insert_image" class="hide-dialog">' + lang.ok + '</button> <button class="hide-dialog">' + lang.cancel + '</button></p>', btn);

          Wysiwyg.KWEimageBrowse('');

          addEvent(elem('btn_insert_image'), 'click', function()
            {
            elem('dw_img_url').value = Kwf.FULLPATH_SITE + '/upload/' + elem('dw_img_url').value;
            self.insertImage();
            }, self);
          }
        }