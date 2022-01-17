function(options) {
    this.options = options || {};
    this.keyboardMode = false;
    this.loaded = false;

    this.container                = document.createElement('div');
    this.container.className      = 'tr8n_language_selector';
    this.container.id             = 'tr8n_language_selector';
    this.container.style.display  = "none";

    document.body.appendChild(this.container);
  }