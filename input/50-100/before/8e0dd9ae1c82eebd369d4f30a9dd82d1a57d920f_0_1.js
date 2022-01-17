function(chrome) {
  window.frames[this.getIframeId()].location = this.getIframeUrl();
  if (my.gadgets[this.id].start_closed) {
    this.handleToggle();
  }
  else if (chrome) {
	// set the gadget box width, and remember that we always render as open
	chrome.style.width = (my.gadgets[this.id].open_width || 600) + 'px';
  }
}