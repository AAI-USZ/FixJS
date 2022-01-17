function(event) {
    var msg = '';
    if (typeof event == 'string') {
      msg = event;
    } else {
      msg = event.data;
    }

    var elements = msg.split(':');
    // if this is not a tr8n message, ignore it
    if (elements[0] != 'tr8n') return;

    if (elements[1] == 'reload') {
      window.location.reload();
      return;
    }

    if (elements[1] == 'translation') {
      if (elements[2] == 'report') {
        Tr8n.UI.Translator.hide();
        Tr8n.UI.Lightbox.show('/tr8n/translator/lb_report?translation_id=' + elements[3], {width:600, height:360});
        return;
      } 
    }

    if (elements[1] == 'language_selector') {
      if (elements[2] == 'change') { Tr8n.UI.LanguageSelector.change(elements[3]); return; } 
      if (elements[2] == 'toggle_inline_translations') { Tr8n.UI.LanguageSelector.toggleInlineTranslations(); return; } 
    }

    if (elements[1] == 'language_case_map') {
      if (elements[2] == 'report') {
        Tr8n.UI.Translator.hide();
        Tr8n.UI.Lightbox.show('/tr8n/translator/lb_report?language_case_map_id=' + elements[3], {width:600, height:360});
        return;
      } 
    }

    if (elements[1] == 'lightbox') {
      if (elements[2] == 'resize') { Tr8n.UI.Lightbox.resize(elements[3]); return; } 
      if (elements[2] == 'hide') { Tr8n.UI.Lightbox.hide(); return;}
    }

    if (elements[1] == 'translator') {
      if (elements[2] == 'resize') { Tr8n.UI.Translator.resize(elements[3]); return; } 
      if (elements[2] == 'hide') { Tr8n.UI.Translator.hide(); return; }
    } 

    alert("Unknown message: " + msg);
  }