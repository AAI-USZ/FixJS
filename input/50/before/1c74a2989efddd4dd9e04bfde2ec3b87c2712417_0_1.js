function(text) {
    var nText = text.replace(/\s/gi,"_");
    nText = nText.replace(/[,.!?;:]/gi, "");
    return nText;    
  }