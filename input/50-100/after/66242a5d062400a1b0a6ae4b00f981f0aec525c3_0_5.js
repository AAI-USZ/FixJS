function browser_showTopSitesTab() {
    this.deselectAwesomescreenTabs();
    this.topSitesTab.classList.add('selected');
    this.topSites.classList.add('selected');
    Places.getTopSites(20, this.showTopSites.bind(this));
  }