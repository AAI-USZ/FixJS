function() {
    if (Tr8n.inline_translations_enabled) {
        Tr8n.UI.Lightbox.show('/tr8n/language/toggle_inline_translations', {width:400, height:480, message:"Disabling inline translations..."});      
    } else {
        Tr8n.UI.Lightbox.show('/tr8n/language/toggle_inline_translations', {width:400, height:480, message:"Enabling inline translations..."});      
    }
  }