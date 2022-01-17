function() {
    this.scheduler_enabled = false;

    var phrases = [];
    var count = 0;

    for (var key in this.missing_translation_keys) {
      var translation_key = this.missing_translation_keys[key].translation_key;
      
      if (translation_key == null) continue;

      // ignore lables that are too long
      if (translation_key.label.length > 200) continue;

      var phrase = {label: translation_key.label};
      if (translation_key.description && translation_key.description.length > 0) phrase.description = translation_key.description;

      phrases.push(phrase);

      var url_params = JSON.stringify(phrases);

      // Tr8n.log('Adding translation key ' + phrase.label + ' to the queue.');
      // Tr8n.log('Params size is ' + url_params.length);

      if (url_params.length > 200) { 
        phrases.pop();
        break;
      }
    }
    
    if (phrases.length == 0) {
      // Tr8n.log('No missing translation keys to submit...');
      this.scheduler_enabled = true;
      return;
    }
    
    var self = this;
    Tr8n.log("Submitting " + phrases.length + " translation keys...");
    
    var params = {
      phrases: JSON.stringify(phrases)
    };
    if (self.source) params['source'] = self.source;   // don't send it unless it is set

    Tr8n.api('language/translate', params, function(data) {
        // Tr8n.log("Received response from the server: " + JSON.stringify(data));
        self.updateMissingTranslationKeys(data['phrases']);
    });
  }