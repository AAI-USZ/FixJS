function tabSwipe_tap() {
      if (this.browser.inTransition) {
        return;
      }
      this.browser.selectTab(this.id);
      this.browser.showPageScreen();
    }