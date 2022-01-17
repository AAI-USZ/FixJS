function(opts) {
    Tr8n.log("Initializing Tr8n Client SDK...");

    this.options = opts || (opts = {});
    this.scheduler_interval = this.options['scheduler_interval'] || this.scheduler_interval; 
    this.inline_translations_enabled = this.options['enable_inline_translations'];
    Tr8n.inline_translations_enabled = this.options['enable_inline_translations'];
    this.tml_enabled = this.options['enable_tml'];
    this.text_enabled = this.options['enable_text'];
    this.source = this.options['source'];

    this.language = new Tr8n.SDK.Language();

    this.initTranslations();
    this.runScheduledTasks();

    if ( this.tml_enabled ) {
      Tr8n.log("Parsing tml...");
      Tr8n.Utils.addEvent(window, 'load', function() {
        Tr8n.SDK.Proxy.initTml();
      });
    } else if ( this.text_enabled ) {
      Tr8n.log("Parsing text...");
      Tr8n.Utils.addEvent(window, 'load', function() {
        Tr8n.SDK.Proxy.initText();
      });
    }

    return this;
  }