function() {
    if (!this.container) return;

    this.container.style.display = "none";
    this.overlay.style.display = "none";
    this.content_frame.src = 'about:blank';
    Tr8n.Utils.showFlash();
  }