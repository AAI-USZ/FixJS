function() {

    jqTabs.VERSION = '0.4.2';

    jqTabs.prototype.activeTab = 0;

    jqTabs.prototype.settings = {
      activeClass: 'active',
      useHistory: true,
      hiddenClass: 'hidden',
      tabsClickable: true,
      callbacksBefore: {},
      callbacksAfter: {}
    };

    function jqTabs($tabsContainer, options) {
      var _this = this;
      this.$tabsContainer = $tabsContainer;
      this.makeContent = __bind(this.makeContent, this);

      this.seek = __bind(this.seek, this);

      this.changeTab = __bind(this.changeTab, this);

      $.extend(this.settings, options);
      if (this.settings.useHistory && !(typeof hasher !== "undefined" && hasher !== null)) {
        this.settings.useHistory = false;
      }
      if (!this.settings.tabsClickable) {
        this.settings.useHistory = false;
      }
      this.updateElements();
      this.numTabs = this.$tabContent.length;
      $(this.$tabs[0]).addClass(this.settings.activeClass);
      this.$tabContent.addClass(this.settings.hiddenClass);
      $(this.$tabContent[0]).removeClass(this.settings.hiddenClass);
      $('ul.tab-headers', $tabsContainer).on('click', 'li', function(e) {
        var target, toTab;
        e.preventDefault();
        if (_this.settings.tabsClickable) {
          target = $(e.currentTarget);
          if (!target.hasClass(_this.settings.activeClass)) {
            toTab = _this.$tabs.index(target);
            return _this.seek(toTab);
          }
        }
      });
      if (this.settings.useHistory) {
        this.setHashChange();
      }
    }

    jqTabs.prototype.changeTab = function(whereTo) {
      var $currentTab;
      $currentTab = $(this.$tabs[whereTo]);
      this.activeTab = whereTo;
      this.$tabs.removeClass(this.settings.activeClass);
      $currentTab.addClass(this.settings.activeClass);
      this.$tabContent.addClass(this.settings.hiddenClass);
      return $(this.$tabContent[whereTo]).removeClass(this.settings.hiddenClass);
    };

    jqTabs.prototype.seek = function(whereTo) {
      var $currentTab, go_on, hash;
      if (0 > whereTo || whereTo >= this.numTabs) {
        return;
      }
      go_on = true;
      if (this.settings.callbacksBefore[whereTo] != null) {
        go_on = this.settings.callbacksBefore[whereTo]();
      }
      if (go_on !== false) {
        if (this.settings.useHistory) {
          $currentTab = $(this.$tabs[whereTo]);
          hash = $currentTab.find('a').attr('href').replace(/\#/, '');
          hasher.changed.active = false;
          hasher.setHash(hash);
          hasher.changed.active = true;
        }
        this.changeTab(whereTo);
        if (this.settings.callbacksAfter[whereTo] != null) {
          this.settings.callbacksAfter[whereTo]();
        }
      }
    };

    jqTabs.prototype.next = function() {
      this.seek(this.activeTab + 1);
    };

    jqTabs.prototype.previous = function() {
      this.seek(this.activeTab - 1);
    };

    jqTabs.prototype.on = function(index, position, callback) {
      switch (position) {
        case 'before':
          return this.settings.callbacksBefore[index] = callback;
        case 'after':
          return this.settings.callbacksAfter[index] = callback;
      }
    };

    jqTabs.prototype.insertAfter = function(index, tabHeader, tabContent, select) {
      var $newTabContent, $newTabHeader, $tabContent, $tabHeader;
      select = select !== void 0 ? select : true;
      $tabHeader = $(this.$tabs[index]);
      $newTabHeader = this.makeHeader(tabHeader);
      $tabHeader.after($newTabHeader);
      $tabContent = $(this.$tabContent[index]);
      $newTabContent = this.makeContent(tabContent);
      $tabContent.after($newTabContent);
      this.numTabs++;
      this.updateElements();
      if (select) {
        this.seek(index + 1);
      }
      return $newTabContent;
    };

    jqTabs.prototype.insertBefore = function(index, tabHeader, tabContent, select) {
      var $newTabContent, $newTabHeader, $tabContent, $tabHeader;
      select = select !== void 0 ? select : true;
      $tabHeader = $(this.$tabs[index]);
      $newTabHeader = this.makeHeader(tabHeader);
      $tabHeader.before($newTabHeader);
      $tabContent = $(this.$tabContent[index]);
      $newTabContent = this.makeContent(tabContent);
      $tabContent.before($newTabContent);
      this.numTabs++;
      this.updateElements();
      if (select) {
        this.seek(index + 1);
      }
      return $newTabContent;
    };

    jqTabs.prototype.addTab = function(tabHeader, tabContent, select) {
      var $newTabContent, $newTabHeader, headerContainer;
      if (this.numTabs === 0) {
        headerContainer = this.$tabsContainer.find('.tab-headers');
        $newTabHeader = this.makeHeader(tabHeader);
        $newTabHeader.addClass(this.settings.activeClass);
        headerContainer.append($newTabHeader);
        $newTabContent = this.makeContent(tabContent);
        $newTabContent.removeClass(this.settings.hiddenClass);
        this.$tabsContainer.append($newTabContent);
        this.updateElements();
        this.numTabs++;
        return $newTabContent;
      } else {
        return this.insertAfter(this.numTabs - 1, tabHeader, tabContent, select);
      }
    };

    jqTabs.prototype.removeTab = function(index) {
      $(this.$tabs[index]).remove();
      $(this.$tabContent[index]).remove();
      this.numTabs--;
      return this.updateElements();
    };

    jqTabs.prototype.removeLast = function() {};

    jqTabs.prototype.updateElements = function() {
      this.$tabs = $('ul.tab-headers li:not(.ignore-tab)', this.$tabsContainer);
      return this.$tabContent = this.$tabsContainer.children('div');
    };

    jqTabs.prototype.makeHeader = function(header) {
      return $('<li/>').append(header);
    };

    jqTabs.prototype.makeContent = function(content) {
      return $('<div/>', {
        'class': 'tabcontent ' + this.settings.hiddenClass
      }).append(content);
    };

    jqTabs.prototype.setHashChange = function() {
      var historyChangeTab,
        _this = this;
      historyChangeTab = function(newHash) {
        var changeTo;
        changeTo = -1;
        _this.$tabs.each(function(index, elem) {
          var href;
          href = $(elem).children('a').attr('href');
          href = href.replace(/\#/, '');
          if (href === newHash) {
            changeTo = index;
            return false;
          }
        });
        if (changeTo !== -1) {
          return _this.seek(changeTo);
        }
      };
      hasher.initialized.add(historyChangeTab);
      hasher.changed.add(historyChangeTab);
      return hasher.init();
    };

    return jqTabs;

  }