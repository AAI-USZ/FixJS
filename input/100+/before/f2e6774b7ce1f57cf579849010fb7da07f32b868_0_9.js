function browser_createTab(url) {
    var iframe = document.createElement('iframe');
    var browserEvents = ['loadstart', 'loadend', 'locationchange',
                         'titlechange', 'iconchange', 'contextmenu'];
    iframe.mozbrowser = true;
    // FIXME: content shouldn't control this directly
    iframe.setAttribute('remote', 'true');
    iframe.style.top = '-999px';
    if (url) {
      iframe.setAttribute('src', url);
    }

    var tab = {
      id: 'tab_' + this.tabCounter++,
      dom: iframe,
      url: url || null,
      title: null,
      loading: false,
      session: new SessionHistory(),
      screenshot: null
    };

    browserEvents.forEach(function attachBrowserEvent(type) {
      iframe.addEventListener('mozbrowser' +
        type, this.handleBrowserEvent(tab));
    }, this);

    this.tabs[tab.id] = tab;
    this.frames.appendChild(iframe);

    return tab.id;
  }