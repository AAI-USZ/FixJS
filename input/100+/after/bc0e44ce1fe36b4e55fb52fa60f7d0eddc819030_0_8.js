function browser_showTabScreen() {

    this.hideCurrentTab();
    this.tabsBadge.innerHTML = '';

    this.tabCover.setAttribute('src', this.currentTab.screenshot);
    this.tabCover.style.display = 'block';

    var multipleTabs = Object.keys(this.tabs).length > 1;
    var ul = document.createElement('ul');

    for (var tab in this.tabs) {
      var title = this.tabs[tab].title || this.tabs[tab].url || _('new-tab');
      var a = document.createElement('a');
      var li = document.createElement('li');
      var span = document.createElement('span');
      var img = document.createElement('img');
      var text = document.createTextNode(title);

      a.setAttribute('data-id', this.tabs[tab].id);

      span.appendChild(text);
      a.appendChild(img);
      a.appendChild(span);
      li.appendChild(a);
      ul.appendChild(li);

      if (this.tabs[tab].screenshot) {
        img.setAttribute('src', this.tabs[tab].screenshot);
      }

      if (this.tabs[tab] == this.currentTab)
        li.classList.add('current');
    }
    this.tabsList.innerHTML = '';
    this.tabsList.appendChild(ul);
    this.switchScreen(this.TABS_SCREEN);
    this.screenSwipeMngr.gestureDetector.startDetecting();
    new GestureDetector(ul).startDetecting();
    this.inTransition = false;
  }