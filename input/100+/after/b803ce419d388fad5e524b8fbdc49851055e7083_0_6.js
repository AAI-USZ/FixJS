function() {

    CustomInfoWindow.name = 'CustomInfoWindow';

    function CustomInfoWindow(marker, content, opts) {
      this.handleSave = __bind(this.handleSave, this);

      this.toggleSection = __bind(this.toggleSection, this);

      this.open = __bind(this.open, this);

      this.close = __bind(this.close, this);

      var wrap;
      this.content = content;
      this.marker = marker;
      this.template = opts.template;
      this.map = marker.map;
      wrap = "<div class=\"customInfoWindow\">\n  <a href=\"javascript:\" title=\"Close\" class=\"close button\"></a>\n    <div class=\"padding\"></div>\n</div>";
      this.wrap = $(wrap);
      this.closeBtn = this.wrap.find('.close');
      this.setMap(this.map);
      this.isVisible = false;
      this.onClose = opts.onClose;
      this.onOpen = opts.onOpen;
      this.onSave = opts.onSave;
      this.deleteCalled = opts.deleteCalled;
      this.moveCalled = opts.moveCalled;
      this.closeBtn.bind('click', this.close);
    }

    CustomInfoWindow.prototype = new google.maps.OverlayView();

    CustomInfoWindow.prototype.onAdd = function() {
      var panes;
      this.wrap.find('.padding').append(this.content);
      this.wrap.css({
        display: "block",
        position: "absolute"
      });
      panes = this.getPanes();
      panes.overlayMouseTarget.appendChild(this.wrap[0]);
      this.iWidth = this.wrap.outerWidth();
      this.iHeight = this.wrap.outerHeight();
      return this.bindButton();
    };

    CustomInfoWindow.prototype.bindButton = function() {
      this.wrap.find('button').bind('click', this.handleSave);
      return this.wrap.find('.iw-options-list .button').bind('click', this.toggleSection);
    };

    CustomInfoWindow.prototype.onRemove = function() {
      this.wrap[0].parentNode.removeChild(this.wrap[0]);
      return this.wrap = null;
    };

    CustomInfoWindow.prototype.draw = function() {
      var cancelHandler, event, events, overlayProjection, pos, _j, _len1, _results,
        _this = this;
      cancelHandler = function(e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          return e.stopPropagation();
        }
      };
      overlayProjection = this.getProjection();
      pos = overlayProjection.fromLatLngToDivPixel(this.marker.position);
      this.wrap.css({
        left: pos.x + 30,
        top: pos.y - 80
      });
      events = ['mousedown', 'touchstart', 'touchend', 'touchmove', 'contextmenu', 'click', 'dblclick', 'mousewheel', 'DOMMouseScroll'];
      this.listeners = [];
      _results = [];
      for (_j = 0, _len1 = events.length; _j < _len1; _j++) {
        event = events[_j];
        _results.push(this.listeners.push(google.maps.event.addDomListener(this.wrap[0], event, cancelHandler)));
      }
      return _results;
    };

    CustomInfoWindow.prototype.close = function() {
      if (this.wrap) {
        this.onClose(this);
        this.isVisible = false;
        return this.wrap.css({
          display: "none"
        });
      }
    };

    CustomInfoWindow.prototype.open = function() {
      if (this.wrap) {
        this.panMap();
        this.onOpen(this);
        this.isVisible = true;
        return this.wrap.css({
          display: "block"
        });
      }
    };

    CustomInfoWindow.prototype.updatePos = function() {
      var newVal, overlayProjection, pos, shareInput, val;
      overlayProjection = this.getProjection();
      pos = overlayProjection.fromLatLngToDivPixel(this.marker.position);
      shareInput = this.wrap.find('[name="share-link"]');
      val = shareInput.val();
      newVal = val.split("?")[0] + "?lat=" + this.marker.position.lat() + "&lng=" + this.marker.position.lng();
      shareInput.val(newVal);
      return this.wrap.css({
        left: pos.x + 30,
        top: pos.y - 80
      });
    };

    CustomInfoWindow.prototype.toggleSection = function(e) {
      var action, activeTab, defaultTab, targetTab, this_;
      this_ = $(e.currentTarget);
      action = this_.attr('data-action');
      defaultTab = this.wrap.find('.marker-desc');
      activeTab = this.wrap.find('.toggling-tab.active');
      targetTab = $("[data-target='" + action + "']");
      switch (action) {
        case "move":
        case "share":
        case "edit":
          this.wrap.find('.iw-options-list .button').removeClass('active');
          if (targetTab.attr("data-target") === activeTab.attr("data-target")) {
            targetTab.removeClass('active');
            defaultTab.addClass('active');
          } else {
            this_.addClass('active');
            activeTab.removeClass('active');
            targetTab.addClass('active');
            defaultTab.removeClass('active');
          }
          break;
        case "delete":
          this.deleteCalled(this.marker);
      }
      if (action === "move") {
        return this.moveCalled(this.marker);
      }
    };

    CustomInfoWindow.prototype.handleSave = function(e) {
      var form, newDesc, newInfo, newTitle, newWikiLink, this_;
      this_ = $(e.currentTarget);
      form = this.wrap.find('.edit-form');
      newTitle = this.wrap.find('[name="marker-title"]').val();
      newDesc = this.wrap.find('[name="marker-description"]').val();
      newWikiLink = this.wrap.find('[name="marker-wiki"]').val();
      form.removeClass('active');
      newInfo = {
        id: this.marker.__gm_id,
        title: newTitle,
        desc: newDesc,
        wikiLink: newWikiLink,
        type: this.marker.type,
        cat: this.marker.cat,
        lat: this.marker.position.lat(),
        lng: this.marker.position.lng(),
        hasDefaultValue: this.marker["hasDefaultValue"]
      };
      this.wrap.find('.padding').html(this.template(newInfo));
      this.bindButton();
      this.wrap.find('.edit').removeClass('active');
      return this.onSave(newInfo);
    };

    CustomInfoWindow.prototype.panMap = function() {
      return this.map.panTo(new google.maps.LatLng(this.marker.position.lat(), this.marker.position.lng()));
    };

    return CustomInfoWindow;

  }