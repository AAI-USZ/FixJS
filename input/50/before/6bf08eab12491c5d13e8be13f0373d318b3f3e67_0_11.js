function() {
    return get(this, 'viewName') === getPath(this, 'tabsContainer.currentView');
  }