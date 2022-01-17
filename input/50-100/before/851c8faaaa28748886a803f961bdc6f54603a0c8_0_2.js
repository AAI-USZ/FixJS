function()
    {
    if (typeof domiwyg != 'undefined')
      {
      var dw = domiwyg;

      dw.lang.create_kwe_link = 'Infoga länk till en annan sida på denna webbplats';
      dw.lang.insert_kwe_image = 'Infoga bild som finns uppladdat till KWE';
      dw.tool_btns.splice(6, 0, ['KWElink', 'create_kwe_link'], ['KWEimage', 'insert_kwe_image']);
      dw.area.prototype.cmdKWElink = kwe.KWElink;
      dw.area.prototype.cmdKWEimage = kwe.KWEimage;
      }
    }