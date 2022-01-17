function(e) {
          var markerCat, menuItem, this_;
          this_ = $(e.currentTarget);
          menuItem = this_.closest('.menu-item');
          markerCat = menuItem.attr('data-markerCat');
          if (this_.hasClass('off')) {
            this_.removeClass('off');
            _this.setMarkersVisibilityByCat(true, markerCat);
            return menuItem.find('.trigger').removeClass('off');
          } else {
            this_.addClass('off');
            _this.setMarkersVisibilityByCat(false, markerCat);
            return menuItem.find('.trigger').addClass('off');
          }
        }