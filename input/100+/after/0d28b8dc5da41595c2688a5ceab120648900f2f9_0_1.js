function browser_init() {
    // Assign UI elements to variables
    this.toolbarStart = document.getElementById('toolbar-start');
    this.urlBar = document.getElementById('url-bar');
    this.urlInput = document.getElementById('url-input');
    this.urlButton = document.getElementById('url-button');
    this.content = document.getElementById('browser-content');
    this.awesomescreen = document.getElementById('awesomescreen');
    this.topSites = document.getElementById('top-sites');
    this.bookmarks = document.getElementById('bookmarks');
    this.history = document.getElementById('history');
    this.topSitesTab = document.getElementById('top-sites-tab');
    this.bookmarksTab = document.getElementById('bookmarks-tab');
    this.historyTab = document.getElementById('history-tab');
    this.backButton = document.getElementById('back-button');
    this.forwardButton = document.getElementById('forward-button');
    this.bookmarkButton = document.getElementById('bookmark-button');
    this.sslIndicator = document.getElementById('ssl-indicator');

    this.tabsBadge = document.getElementById('tabs-badge');
    this.throbber = document.getElementById('throbber');
    this.frames = document.getElementById('frames');
    this.tabsList = document.getElementById('tabs-list');
    this.mainScreen = document.getElementById('main-screen');
    this.tabCover = document.getElementById('tab-cover');

    // Add event listeners
    window.addEventListener('submit', this);
    window.addEventListener('keyup', this, true);
    window.addEventListener('resize', this.handleWindowResize.bind(this));

    this.backButton.addEventListener('click', this.goBack.bind(this));
    this.urlButton.addEventListener('click', this.handleUrlFormSubmit.bind(this));
    this.forwardButton.addEventListener('click', this.goForward.bind(this));
    this.bookmarkButton.addEventListener('click', this.bookmark.bind(this));
    this.urlInput.addEventListener('focus', this.urlFocus.bind(this));
    this.topSites.addEventListener('click', this.followLink.bind(this));
    this.bookmarks.addEventListener('click', this.followLink.bind(this));
    this.history.addEventListener('click', this.followLink.bind(this));
    this.tabsBadge.addEventListener('click',
      this.handleTabsBadgeClicked.bind(this));
    this.topSitesTab.addEventListener('click',
      this.showTopSitesTab.bind(this));
    this.bookmarksTab.addEventListener('click',
      this.showBookmarksTab.bind(this));
    this.historyTab.addEventListener('click', this.showHistoryTab.bind(this));

    this.tabsSwipeMngr.browser = this;
    ['mousedown', 'pan', 'tap', 'swipe'].forEach(function(evt) {
      this.tabsList.addEventListener(evt,
        this.tabsSwipeMngr[evt].bind(this.tabsSwipeMngr));
    }, this);

    this.screenSwipeMngr.browser = this;
    this.screenSwipeMngr.screen = this.mainScreen;
    this.screenSwipeMngr.gestureDetector = new GestureDetector(this.mainScreen);

    ['mousedown', 'pan', 'tap', 'swipe'].forEach(function(evt) {
      this.mainScreen.addEventListener(evt,
        this.screenSwipeMngr[evt].bind(this.screenSwipeMngr));
    }, this);

    this.handleWindowResize();

    ModalDialog.init(false);

    // Load homepage once Places is initialised
    // (currently homepage is blank)
    Places.init((function() {
      this.selectTab(this.createTab(this.START_PAGE_URL));
      this.showPageScreen();
    }).bind(this));
  }