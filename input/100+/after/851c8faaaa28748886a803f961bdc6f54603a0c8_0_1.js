function(domiwyg)
    {
    return {
      /**
       * Extends Domiwyg with KWE specific buttons
       * @method init
       * @public
       */
      init: function()
        {
        if (typeof domiwyg !== 'undefined')
          {
          domiwyg.lang.create_kwe_link = 'Infoga länk till en annan sida på denna webbplats';
          domiwyg.lang.insert_kwe_image = 'Infoga bild som finns uppladdat till KWE';
          domiwyg.tool_btns.splice(6, 0, ['KWElink', 'create_kwe_link'], ['KWEimage', 'insert_kwe_image']);
          domiwyg.area.prototype.cmdKWElink = Wysiwyg.KWElink;
          domiwyg.area.prototype.cmdKWEimage = Wysiwyg.KWEimage;
          }
        },

      /**
       * Shows the "Select KWE Link" dialog. Let's the user select an internal 
       * page to link to
       * @method KWElink
       * @public
       * @param {HTMLButtonElement} btn The button who fired the event
       */
      KWElink: function(btn)
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

          Wysiwyg.KWElinkBrowse('');

          if (node_name)
            {
            if (node_name !== 'a')
              {
              element = null;
              }

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
        },

      /**
       * Loads new pages into the "Select link" dialog
       * @method KWElinkBrowse
       * @public
       * @param {String} path The path to browse to
       */
      KWElinkBrowse: function(path)
        {
        var html = '', json, i;

        Ajax.get(Kwf.MODR + 'page/js_browse/' + path, function(resp)
          {
          json = resp.page.pages;
          json.splice(0, 0, {url: '', title: 'Gå uppåt'});

          for (i = 0; i < json.length; i++)
            {
            html += '<li data-url="' + json[i].url + '">' + (i ? '<input type="radio" name="select-page" /> ' : '') + '<a href="javascript: void(0);" class="browse-to-link">' + json[i].title + '</a></li>';
            }

          elem('dw_KWE_page_browser').innerHTML = html;
          elem('dw_KWE_cd').innerHTML = resp.page.cd;
          }, function() {});
        },

      /**
       * Shows the "Select KWE Image" dialog. Let's the user select an uploaded
       * image to embed
       * @method KWEimage
       * @public
       * @param {HTMLButtonElement} btn The button who fired the event
       */
      KWEimage: function(btn)
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
        },

      /**
       * Loads new images and folders into the "Select image" dialog
       * @method KWEimageBrowse
       * @public
       * @param {String} path The path to browse to
       */
      KWEimageBrowse: function(path)
        {
        var html = '', json, i;

        Ajax.get(Kwf.MODR + 'upload/js_browse/' + path, function(resp)
          {
          json = resp.page.files;
          json.splice(0, 0, {folder: 1, url: resp.page.up_path || '', name: 'Gå uppåt'});

          if (resp.page.cd !== '')
            {
            resp.page.cd += '/';
            }

          for (i = 0; i < json.length; i++)
            {
            html += '<li data-url="' + (i ? resp.page.cd : '') + json[i].url + '">';
            if (json[i].folder)
              {
              html += ' <a href="javascript: void(0);" class="browse-to-img">' + json[i].name + '</a></li>';
              }
            else
              {
              html += (i ? '<input type="radio" name="select-image" /> ' : '') + json[i].name + '</li>';
              }
            }

          elem('dw_KWE_image_browser').innerHTML = html;
          elem('dw_KWE_cd').innerHTML = '/' + resp.page.cd;
          }, function() {});
        },

      /**
       * Saves the current content of all Domiwygs on the form in it's corresponding textareas
       * @method saveDomiwyg
       * @public
       * @param {HTMLButtonElement} targ The button that fired the event
       */
      saveDomiwyg: function(targ)
        {
        var textareas = targ.form.getElementsByTagName('textarea'), 
          t;

        for (t = 0; t < textareas.length; t++)
          {
          if (hasClass(textareas[t], 'has-domiwyg'))
            {
            textareas[t].value = textareas[t].domiwyg.save();
            }
          }
        }
      };
    }