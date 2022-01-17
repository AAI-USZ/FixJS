function browser_showTopSitesTab() {
    this.deselectAwesomescreenTabs();
    this.topSitesTab.classList.add('selected');
    this.topSites.classList.add('selected');
    Places.getTopSites(this.showTopSites.bind(this));
  }