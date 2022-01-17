function(tab, visible) {
    if (ModalDialog.originHasEvent(tab.id)) {
      if (visible) {
        ModalDialog.show(tab.id);
      } else {
        ModalDialog.hide();
      }
    }
    // We put loading tabs off screen as we want to screenshot
    // them when loaded
    if (tab.loading && !visible) {
      tab.dom.style.top = '-999px';
      return;
    }
    if (tab.dom.setActive) {
      tab.dom.setActive(visible);
    }
    tab.dom.style.display = visible ? 'block' : 'none';
    tab.dom.style.top = '0px';
  }