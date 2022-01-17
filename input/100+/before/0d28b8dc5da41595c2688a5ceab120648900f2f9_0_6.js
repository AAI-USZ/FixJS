function browser_createTab(url, iframe) {
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.mozbrowser = true;

      if (url) {
        iframe.setAttribute('src', url);
      }
    } else {
      // FIXME: Remove this once
      // https://bugzilla.mozilla.org/show_bug.cgi?id=769182
      // has landed
      iframe.setAttribute('src', url);
    }

    var browserEvents = ['loadstart', 'loadend', 'locationchange',
                         'titlechange', 'iconchange', 'contextmenu',
                         'securitychange', 'openwindow', 'close'];
    iframe.style.top = '-999px';

    // FIXME: content shouldn't control this directly
    iframe.setAttribute('remote', 'true');

    var tab = {
      id: 'tab_' + this.tabCounter++,
      dom: iframe,
      url: url || null,
      title: null,
      loading: false,
      screenshot: null,
      security: null
    };

    browserEvents.forEach(function attachBrowserEvent(type) {
      iframe.addEventListener('mozbrowser' +
        type, this.handleBrowserEvent(tab));
    }, this);

    this.tabs[tab.id] = tab;
    this.frames.appendChild(iframe);

    return tab.id;
  }