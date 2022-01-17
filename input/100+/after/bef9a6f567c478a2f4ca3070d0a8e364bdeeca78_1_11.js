function() {
    if (this.container) return;

    this.container                = document.createElement('div');
    this.container.className      = 'tr8n_translator';
    this.container.id             = 'tr8n_translator';
    this.container.style.display  = "none";
    this.container.style.width    = "400px";

    this.stem_image = document.createElement('img');
    this.stem_image.src = Tr8n.host + '/assets/tr8n/top_left_stem.png';
    this.container.appendChild(this.stem_image);

    this.content_frame = document.createElement('iframe');
    this.content_frame.src = 'about:blank';
    this.content_frame.style.border = '0px';
    this.container.appendChild(this.content_frame);

    document.body.appendChild(this.container);
  }