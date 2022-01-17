function browser_updateSecurityIcon() {
    if (!this.currentTab.security) {
      this.sslIndicator.value = '';
      return;
    }
    this.sslIndicator.value = this.currentTab.security.state;
  }