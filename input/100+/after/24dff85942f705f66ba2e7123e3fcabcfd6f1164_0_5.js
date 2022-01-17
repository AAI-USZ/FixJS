function tabSwipe_mousedown(e) {
      e.preventDefault();
      this.tab = e.target;
      this.id = this.tab.getAttribute('data-id');
      this.containerWidth = this.tab.parentNode.clientWidth;
      // We cant delete the last tab
      this.deleteable = Object.keys(this.browser.tabs).length > 1;
      if (!this.deleteable || this.browser.inTransition) {
        return;
      }
      this.tab.classList.add('active');
      this.tab.style.MozTransition = '';
      this.tab.style.position = 'absolute';
      this.tab.style.width = e.target.parentNode.clientWidth + 'px';
    }