function(e) {
          var markerCat, menuItem, parent, this_;
          this_ = $(e.currentTarget);
          parent = this_.closest('.menu-marker');
          menuItem = parent.find('.menu-item');
          markerCat = menuItem.attr('data-markerCat');
          if (this_.hasClass('off')) {
            this_.removeClass('off');
            _this.setMarkersVisibilityByCat(true, markerCat);
            return parent.find('.trigger').removeClass('off');
          } else {
            this_.addClass('off');
            _this.setMarkersVisibilityByCat(false, markerCat);
            return parent.find('.trigger').addClass('off');
          }
        }