function(newMode) {
      var myDialog,
        _this = this;
      myDialog = $("#discard-area-classifcation-confirm").dialog({
        resizable: false,
        width: 400,
        modal: true,
        buttons: {
          "Discard area classification": function() {
            $(_this).dialog("close");
            _this._removeAllFeatures();
            return $(Edgar.map).trigger('changemode', $(_this).data('newMode'));
          },
          Cancel: function() {
            return $(_this).dialog("close");
          }
        }
      });
      return myDialog.data('newMode', newMode);
    }