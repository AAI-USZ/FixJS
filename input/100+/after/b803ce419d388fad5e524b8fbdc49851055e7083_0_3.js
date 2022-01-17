function() {

    CustomMap.name = 'CustomMap';

    function CustomMap(id) {
      this.handleAddTool = __bind(this.handleAddTool, this);

      this.handleExport = __bind(this.handleExport, this);

      this.sendMapForApproval = __bind(this.sendMapForApproval, this);

      this.destroyLocalStorage = __bind(this.destroyLocalStorage, this);

      var _this = this;
      this.localStorageKey = "gw2c_markers_config_01";
      this.blankTilePath = 'tiles/00empty.jpg';
      this.iconsPath = 'assets/images/icons/32x32';
      this.maxZoom = 7;
      this.appState = "read";
      this.html = $('html');
      this.lngContainer = $('#long');
      this.latContainer = $('#lat');
      this.devModInput = $('#dev-mod');
      this.addMarkerLink = $('#add-marker');
      this.exportBtn = $('#export');
      this.exportWindow = $('#export-windows');
      this.markersOptionsMenu = $('#markers-options');
      this.mapOptions = $('#edition-tools a');
      this.defaultLat = 26.765230565697536;
      this.defaultLng = -36.32080078125;
      this.defaultCat = "explore";
      window.LANG = "en";
      this.areaSummaryBoxes = [];
      this.markersImages = {};
      this.draggableMarker = false;
      this.visibleMarkers = true;
      this.canToggleMarkers = true;
      this.currentOpenedInfoWindow = false;
      this.gMapOptions = {
        center: new google.maps.LatLng(this.getStartLat(), this.getStartLng()),
        zoom: 6,
        minZoom: 3,
        maxZoom: this.maxZoom,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: ["custom", google.maps.MapTypeId.ROADMAP]
        },
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER,
          zoomControlStyle: google.maps.ZoomControlStyle.SMALL
        }
      };
      this.customMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord, path;
          normalizedCoord = coord;
          if (normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
            return path = 'tiles/' + zoom + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
          } else {
            return _this.blankTilePath;
          }
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: this.maxZoom,
        name: 'GW2 Map'
      });
      this.map = new google.maps.Map($(id)[0], this.gMapOptions);
      this.map.mapTypes.set('custom', this.customMapType);
      this.map.setMapTypeId('custom');
      $.get('assets/javascripts/templates/confirmBox._', function(e) {
        var template;
        template = _.template(e);
        _this.confirmBox = new Confirmbox(template);
        return _this.handleLocalStorageLoad(function() {
          _this.addMenuIcons(function() {
            _this.addTools = $('.menu-marker a.add');
            return _this.addTools.each(function(index, target) {
              return $(target).bind('click', _this.handleAddTool);
            });
          });
          google.maps.event.addListener(_this.map, 'zoom_changed', function(e) {
            var zoomLevel;
            zoomLevel = _this.map.getZoom();
            if (zoomLevel === 4) {
              _this.canToggleMarkers = false;
              _this.hideMarkersOptionsMenu();
              _this.setAllMarkersVisibility(false);
              _this.setAreasInformationVisibility(true);
              if (_this.currentOpenedInfoWindow) {
                return _this.currentOpenedInfoWindow.close();
              }
            } else if (zoomLevel > 4) {
              _this.canToggleMarkers = true;
              _this.showMarkersOptionsMenu();
              _this.setAllMarkersVisibility(true);
              return _this.setAreasInformationVisibility(false);
            } else if (zoomLevel < 4) {
              _this.canToggleMarkers = false;
              _this.hideMarkersOptionsMenu();
              _this.setAllMarkersVisibility(false);
              _this.setAreasInformationVisibility(false);
              if (_this.currentOpenedInfoWindow) {
                return _this.currentOpenedInfoWindow.close();
              }
            }
          });
          _this.gMarker = {};
          _this.editInfoWindowTemplate = "";
          return $.get('assets/javascripts/templates/customInfoWindow._', function(e) {
            _this.editInfoWindowTemplate = _.template(e);
            _this.setAllMarkers();
            _this.initializeAreaSummaryBoxes();
            $('#destroy').bind('click', _this.destroyLocalStorage);
            return $('#send').bind('click', _this.sendMapForApproval);
          });
        });
      });
    }

    CustomMap.prototype.handleLocalStorageLoad = function(callback) {
      var confirmMessage,
        _this = this;
      if (App.localStorageAvailable && this.getConfigFromLocalStorage()) {
        confirmMessage = "I have detected data stored locally, Do you want to load it?";
        return this.confirmBox.initConfirmation(confirmMessage, function(e) {
          if (e) {
            _this.MarkersConfig = _this.getConfigFromLocalStorage();
          } else {
            _this.MarkersConfig = Markers;
          }
          return callback();
        });
      } else {
        this.MarkersConfig = Markers;
        return callback();
      }
    };

    CustomMap.prototype.getConfigFromLocalStorage = function() {
      var json;
      json = localStorage.getItem(this.localStorageKey);
      return JSON.parse(json);
    };

    CustomMap.prototype.addMarker = function(markerInfo, otherInfo, isNew, defaultValue) {
      var createInfoWindow, iconPath, iconmid, iconsize, image, isMarkerDraggable, marker, markerVisibility, markersCat, markersType,
        _this = this;
      createInfoWindow = function(marker) {
        var editInfoWindowContent, templateInfo;
        templateInfo = {
          id: marker.__gm_id,
          title: marker["data_translation"][window.LANG]["title"],
          desc: marker["data_translation"][window.LANG]["desc"],
          wikiLink: marker["data_translation"][window.LANG]["wikiLink"],
          hasDefaultValue: marker["hasDefaultValue"],
          type: marker.type,
          lat: marker.position.lat(),
          lng: marker.position.lng()
        };
        editInfoWindowContent = _this.editInfoWindowTemplate(templateInfo);
        return marker["infoWindow"] = new CustomInfoWindow(marker, editInfoWindowContent, {
          onClose: function() {
            return _this.currentOpenedInfoWindow = null;
          },
          onOpen: function(infoWindow) {
            return _this.currentOpenedInfoWindow = infoWindow;
          },
          onSave: function(newInfo) {
            return _this.updateMarkerInfos(newInfo);
          },
          deleteCalled: function(marker) {
            return _this.removeMarker(marker.__gm_id, markersType, markersCat);
          },
          moveCalled: function(marker) {
            if (marker.getDraggable()) {
              marker.setDraggable(false);
              return marker.setCursor("pointer");
            } else {
              marker.setDraggable(true);
              return marker.setCursor("move");
            }
          },
          template: _this.editInfoWindowTemplate
        });
      };
      iconsize = 32;
      iconmid = iconsize / 2;
      iconPath = Metadata.icons_path + otherInfo.icon;
      markersType = otherInfo["markersType"];
      markersCat = otherInfo["markersCat"];
      markerVisibility = markersCat === this.defaultCat || isNew ? true : false;
      if (!(this.markersImages[markersType] != null)) {
        image = new google.maps.MarkerImage(iconPath, null, null, new google.maps.Point(iconmid, iconmid), new google.maps.Size(iconsize, iconsize));
        this.markersImages[markersType] = image;
      }
      isMarkerDraggable = markerInfo.draggable != null ? markerInfo.draggable : false;
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerInfo.lat, markerInfo.lng),
        map: this.map,
        icon: this.markersImages[markersType],
        visible: markerVisibility,
        draggable: isMarkerDraggable,
        cursor: isMarkerDraggable ? "move" : "pointer",
        title: defaultValue != null ? defaultValue[window.LANG]["title"] : markerInfo["data_translation"][window.LANG]["title"],
        animation: isNew ? google.maps.Animation.DROP : false
      });
      if (defaultValue != null) {
        marker["data_translation"] = defaultValue;
        marker["hasDefaultValue"] = true;
      } else {
        marker["data_translation"] = markerInfo["data_translation"];
        marker["hasDefaultValue"] = false;
      }
      marker["type"] = markersType;
      marker["cat"] = markersCat;
      if (markerInfo.lat.toString() === this.getStartLat() && markerInfo.lng.toString() === this.getStartLng()) {
        if (!(marker["infoWindow"] != null)) {
          createInfoWindow(marker);
          marker["infoWindow"].open();
        } else {
          marker["infoWindow"].open();
        }
      }
      google.maps.event.addListener(marker, 'dragend', function(e) {
        _this.saveToLocalStorage();
        if (marker["infoWindow"] != null) {
          return marker["infoWindow"].updatePos();
        }
      });
      google.maps.event.addListener(marker, 'click', function(e) {
        if (marker["infoWindow"] != null) {
          if (_this.currentOpenedInfoWindow === marker["infoWindow"]) {
            return _this.currentOpenedInfoWindow.close();
          } else {
            if (_this.currentOpenedInfoWindow) {
              _this.currentOpenedInfoWindow.close();
            }
            return marker["infoWindow"].open();
          }
        } else {
          createInfoWindow(marker);
          if (_this.currentOpenedInfoWindow) {
            _this.currentOpenedInfoWindow.close();
          }
          return marker["infoWindow"].open();
        }
      });
      return marker;
    };

    CustomMap.prototype.setAllMarkers = function() {
      var defaultValue, marker, markerType, markerTypeObject, markersCat, markersObjects, newMarker, otherInfo, _ref, _results;
      _ref = this.MarkersConfig;
      _results = [];
      for (markersCat in _ref) {
        markersObjects = _ref[markersCat];
        if (!(this.gMarker[markersCat] != null)) {
          this.gMarker[markersCat] = {};
          this.gMarker[markersCat]["data_translation"] = markersObjects.data_translation;
          this.gMarker[markersCat]["marker_types"] = {};
        }
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = markersObjects.marker_types;
          _results1 = [];
          for (markerType in _ref1) {
            markerTypeObject = _ref1[markerType];
            this.gMarker[markersCat]["marker_types"][markerType] = $.extend(true, {}, markerTypeObject);
            this.gMarker[markersCat]["marker_types"][markerType]["markers"] = [];
            otherInfo = {
              markersCat: markersCat,
              markersType: markerType,
              icon: markerTypeObject.icon
            };
            defaultValue = null;
            if ((markerTypeObject["data_translation"][window.LANG]["title"] != null) && (markerTypeObject["data_translation"][window.LANG]["desc"] != null)) {
              defaultValue = markerTypeObject["data_translation"];
            }
            _results1.push((function() {
              var _j, _len1, _ref2, _results2;
              _ref2 = markerTypeObject.markers;
              _results2 = [];
              for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                marker = _ref2[_j];
                newMarker = this.addMarker(marker, otherInfo, false, defaultValue);
                _results2.push(this.gMarker[markersCat]["marker_types"][markerType]["markers"].push(newMarker));
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    CustomMap.prototype.setAllMarkersVisibility = function(isVisible) {
      var cat, markerType, markerTypeObject, markersObjects, _ref, _results;
      _ref = this.gMarker;
      _results = [];
      for (cat in _ref) {
        markersObjects = _ref[cat];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = markersObjects.marker_types;
          _results1 = [];
          for (markerType in _ref1) {
            markerTypeObject = _ref1[markerType];
            if (!$("[data-type='" + markerType + "']").hasClass('off')) {
              _results1.push(this.setMarkersVisibilityByType(isVisible, markerType, cat));
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    CustomMap.prototype.setMarkersVisibilityByType = function(isVisible, type, cat) {
      var marker, _j, _len1, _ref, _results;
      _ref = this.gMarker[cat]["marker_types"][type]["markers"];
      _results = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        marker = _ref[_j];
        _results.push(marker.setVisible(isVisible));
      }
      return _results;
    };

    CustomMap.prototype.setMarkersVisibilityByCat = function(isVisible, cat) {
      var marker, markerType, markerTypeObject, _ref, _results;
      _ref = this.gMarker[cat]["marker_types"];
      _results = [];
      for (markerType in _ref) {
        markerTypeObject = _ref[markerType];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = markerTypeObject.markers;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            marker = _ref1[_j];
            _results1.push(marker.setVisible(isVisible));
          }
          return _results1;
        })());
      }
      return _results;
    };

    CustomMap.prototype.destroyLocalStorage = function(e) {
      var confirmMessage,
        _this = this;
      confirmMessage = "This action will destroy you local change to the map. Are you sure you want to proceed?";
      return this.confirmBox.initConfirmation(confirmMessage, function(e) {
        if (e && _this.getConfigFromLocalStorage()) {
          localStorage.removeItem(_this.localStorageKey);
          return window.location = "/";
        }
      });
    };

    CustomMap.prototype.sendMapForApproval = function(e) {
      var ajaxUrl, confirmMessage, modal, this_,
        _this = this;
      this_ = $(e.currentTarget);
      ajaxUrl = this_.attr('data-ajaxUrl');
      modal = new Modalbox();
      modal.setContent('<img class="loading" src="/assets/images/loading-black.gif">');
      confirmMessage = "Are you ready to send your map for approval?";
      return this.confirmBox.initConfirmation(confirmMessage, function(e) {
        var t;
        modal.open();
        return t = setTimeout(function() {
          return modal.close(function() {
            var msg;
            msg = "<h1>Thank you!</h1>\n<p>A team of dedicated grawls will sort that out.</p>";
            modal.setContent(msg);
            return modal.open();
          });
        }, 500);
      });
    };

    CustomMap.prototype.handleExport = function(e) {
      var exportMarkerObject, jsonString, marker, markerType, markerTypeObject, markersCat, markersObjects, nm, _j, _len1, _ref, _ref1, _ref2;
      exportMarkerObject = {};
      _ref = this.gMarker;
      for (markersCat in _ref) {
        markersObjects = _ref[markersCat];
        if (!(exportMarkerObject[markersCat] != null)) {
          exportMarkerObject[markersCat] = {};
          exportMarkerObject[markersCat]["data_translation"] = markersObjects["data_translation"];
          exportMarkerObject[markersCat]["marker_types"] = {};
        }
        _ref1 = markersObjects.marker_types;
        for (markerType in _ref1) {
          markerTypeObject = _ref1[markerType];
          exportMarkerObject[markersCat]["marker_types"][markerType] = $.extend(true, {}, markerTypeObject);
          exportMarkerObject[markersCat]["marker_types"][markerType]["markers"] = [];
          _ref2 = markerTypeObject.markers;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            marker = _ref2[_j];
            if (marker["data_translation"] != null) {
              nm = {
                "lng": marker.getPosition().lng(),
                "lat": marker.getPosition().lat(),
                "data_translation": $.extend(true, {}, marker["data_translation"])
              };
            } else {
              nm = {
                "lng": marker.getPosition().lng(),
                "lat": marker.getPosition().lat()
              };
            }
            exportMarkerObject[markersCat]["marker_types"][markerType]["markers"].push(nm);
          }
        }
      }
      jsonString = JSON.stringify(exportMarkerObject);
      return jsonString;
    };

    CustomMap.prototype.handleAddTool = function(e) {
      var coord, defaultValue, getValue, icon, markerCat, markerLink, markerType, newMarker, newMarkerInfo, otherInfo, parent, this_,
        _this = this;
      this_ = $(e.currentTarget);
      parent = this_.closest('.type-menu-item');
      markerLink = parent.find('.marker-type-link');
      markerType = markerLink.attr('data-type');
      console.log(markerLink);
      markerCat = markerLink.attr('data-cat');
      icon = markerLink.attr('data-icon');
      coord = this.map.getCenter();
      getValue = function(cat, type) {
        var defaultValue;
        defaultValue = null;
        if ((_this.MarkersConfig[cat]["marker_types"][type]["data_translation"][window.LANG]["desc"] != null) && (_this.MarkersConfig[cat]["marker_types"][type]["data_translation"][window.LANG]["title"] != null)) {
          defaultValue = $.extend(true, {}, _this.MarkersConfig[cat]["marker_types"][type]["data_translation"]);
        }
        return defaultValue;
      };
      defaultValue = getValue(markerCat, markerType);
      otherInfo = {
        markersCat: markerCat,
        markersType: markerType,
        icon: icon
      };
      if (defaultValue) {
        newMarkerInfo = {
          lat: coord.lat(),
          lng: coord.lng(),
          draggable: true
        };
      } else {
        newMarkerInfo = {
          lat: coord.lat(),
          lng: coord.lng(),
          data_translation: {
            en: {
              title: "",
              desc: "",
              wikiLink: ""
            },
            fr: {
              title: "",
              desc: "",
              wikiLink: ""
            }
          },
          draggable: true
        };
      }
      newMarker = this.addMarker(newMarkerInfo, otherInfo, true, defaultValue);
      return this.gMarker[markerCat]["marker_types"][markerType]["markers"].push(newMarker);
    };

    CustomMap.prototype.getStartLat = function() {
      var params;
      params = extractUrlParams();
      if (params['lat'] != null) {
        return params['lat'];
      } else {
        return this.defaultLat;
      }
    };

    CustomMap.prototype.getStartLng = function() {
      var params;
      params = extractUrlParams();
      if (params['lng'] != null) {
        return params['lng'];
      } else {
        return this.defaultLng;
      }
    };

    CustomMap.prototype.removeMarkerFromType = function(mType, mCat) {
      var confirmMessage,
        _this = this;
      confirmMessage = "Delete all «" + mType + "» markers on the map?";
      return this.confirmBox.initConfirmation(confirmMessage, function(e) {
        var marker, markerKey, _j, _len1, _ref, _results;
        if (e) {
          _ref = _this.gMarker[mCat]["marker_types"][mType]["markers"];
          _results = [];
          for (markerKey = _j = 0, _len1 = _ref.length; _j < _len1; markerKey = ++_j) {
            marker = _ref[markerKey];
            marker.setMap(null);
            _this.gMarker[mCat]["marker_types"][typeKey]['markers'] = _.reject(markerType.markers, function(m) {
              return m === marker;
            });
            _results.push(_this.saveToLocalStorage());
          }
          return _results;
        }
      });
    };

    CustomMap.prototype.removeMarker = function(id, mType, mCat) {
      var confirmMessage,
        _this = this;
      confirmMessage = "Are you sure you want to delete this marker?";
      return this.confirmBox.initConfirmation(confirmMessage, function(e) {
        var marker, markerKey, _j, _len1, _ref;
        if (e) {
          _ref = _this.gMarker[mCat]["marker_types"][mType]["markers"];
          for (markerKey = _j = 0, _len1 = _ref.length; _j < _len1; markerKey = ++_j) {
            marker = _ref[markerKey];
            if (!(marker.__gm_id === id)) {
              continue;
            }
            if (marker.infoWindow != null) {
              marker.infoWindow.setMap(null);
            }
            marker.setMap(null);
            _this.gMarker[mCat]["marker_types"][mType]['markers'] = _.reject(_this.gMarker[mCat]["marker_types"][mType]["markers"], function(m) {
              return m === marker;
            });
            _this.saveToLocalStorage();
            return true;
          }
        }
      });
    };

    CustomMap.prototype.updateMarkerInfos = function(newInfo) {
      var marker, markerKey, _j, _len1, _ref;
      _ref = this.gMarker[newInfo.cat]["marker_types"][newInfo.type]["markers"];
      for (markerKey = _j = 0, _len1 = _ref.length; _j < _len1; markerKey = ++_j) {
        marker = _ref[markerKey];
        if (!(marker.__gm_id === newInfo.id)) {
          continue;
        }
        if (marker["data_translation"] != null) {
          marker["data_translation"][window.LANG]["desc"] = newInfo.desc;
          marker["data_translation"][window.LANG]["title"] = newInfo.title;
          marker["data_translation"][window.LANG]["wikiLink"] = newInfo.wikiLink;
        } else {
          marker.desc = newInfo.desc;
          marker.title = newInfo.title;
          marker.wikiLink = newInfo.wikiLink;
        }
        this.saveToLocalStorage();
        return;
      }
    };

    CustomMap.prototype.saveToLocalStorage = function() {
      var json;
      if (App.localStorageAvailable) {
        json = this.handleExport();
        return localStorage.setItem(this.localStorageKey, json);
      }
    };

    CustomMap.prototype.getMarkerByCoordinates = function(lat, lng) {
      var key, marker, markerTypeObject, markersCat, markersObjects, _j, _k, _len1, _len2, _ref, _ref1, _ref2;
      _ref = this.MarkersConfig;
      for (markersCat in _ref) {
        markersObjects = _ref[markersCat];
        _ref1 = markersObjects.marker_types;
        for (key = _j = 0, _len1 = _ref1.length; _j < _len1; key = ++_j) {
          markerTypeObject = _ref1[key];
          _ref2 = markerTypeObject.markers;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            marker = _ref2[_k];
            if (marker.lat === lat && marker.lng === lng) {
              return marker;
            }
          }
        }
      }
      return false;
    };

    CustomMap.prototype.turnOfMenuIconsFromCat = function(markerCat) {
      var menu;
      menu = $(".menu-item[data-markerCat='" + markerCat + "']");
      menu.addClass('off');
      console.log(menu);
      menu.find('.group-toggling').addClass('off');
      return menu.find('.trigger').addClass('off');
    };

    CustomMap.prototype.addMenuIcons = function(callback) {
      var markersOptions,
        _this = this;
      return markersOptions = $.get('assets/javascripts/templates/markersOptions._', function(e) {
        var markerCat, template, _results;
        template = _.template(e);
        html = $(template(_this.MarkersConfig));
        html.find(".trigger").bind('click', function(e) {
          var item, markerCat, markerType, myGroupTrigger, myMenuItem;
          item = $(e.currentTarget);
          myGroupTrigger = item.closest(".menu-marker").find('.group-toggling');
          myMenuItem = item.closest(".menu-item");
          markerType = item.attr('data-type');
          markerCat = item.attr('data-cat');
          if (_this.canToggleMarkers) {
            if (item.hasClass('off')) {
              _this.setMarkersVisibilityByType(true, markerType, markerCat);
              item.removeClass('off');
              myMenuItem.removeClass('off');
              return myGroupTrigger.removeClass('off');
            } else {
              _this.setMarkersVisibilityByType(false, markerType, markerCat);
              return item.addClass('off');
            }
          }
        });
        html.find('.group-toggling').bind('click', function(e) {
          var markerCat, menuItem, this_;
          this_ = $(e.currentTarget);
          menuItem = this_.closest('.menu-item');
          markerCat = menuItem.attr('data-markerCat');
          if (this_.hasClass('off')) {
            this_.removeClass('off');
            menuItem.removeClass('off');
            _this.setMarkersVisibilityByCat(true, markerCat);
            return menuItem.find('.trigger').removeClass('off');
          } else {
            this_.addClass('off');
            menuItem.addClass('off');
            _this.setMarkersVisibilityByCat(false, markerCat);
            return menuItem.find('.trigger').addClass('off');
          }
        });
        _this.markersOptionsMenu.find('.padding').prepend(html);
        callback();
        _results = [];
        for (markerCat in _this.MarkersConfig) {
          if (markerCat !== _this.defaultCat) {
            _results.push(_this.turnOfMenuIconsFromCat(markerCat));
          }
        }
        return _results;
      });
    };

    CustomMap.prototype.initializeAreaSummaryBoxes = function() {
      var area, _results;
      _results = [];
      for (area in Areas) {
        _results.push(this.areaSummaryBoxes[area] = new AreaSummary(this.map, Areas[area]));
      }
      return _results;
    };

    CustomMap.prototype.setAreasInformationVisibility = function(isVisible) {
      var box, _j, _len1, _ref, _results;
      _ref = this.areaSummaryBoxes;
      _results = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        box = _ref[_j];
        _results.push(box.setVisible(isVisible));
      }
      return _results;
    };

    CustomMap.prototype.toggleMarkersOptionsMenu = function() {
      return this.markersOptionsMenu.toggleClass('active');
    };

    CustomMap.prototype.hideMarkersOptionsMenu = function() {
      return this.markersOptionsMenu.addClass('off');
    };

    CustomMap.prototype.showMarkersOptionsMenu = function() {
      return this.markersOptionsMenu.removeClass('off');
    };

    return CustomMap;

  }