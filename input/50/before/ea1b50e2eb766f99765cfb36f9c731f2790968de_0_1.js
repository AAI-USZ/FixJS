function() {
            $(_this).dialog("close");
            _this._removeAllFeatures();
            return $(Edgar.map).trigger('changemode', $(_this).data('newMode'));
          }