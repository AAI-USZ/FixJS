  get view() {
    delete this.view;
    return this.view = document.getElementById('recents-view');
  },
