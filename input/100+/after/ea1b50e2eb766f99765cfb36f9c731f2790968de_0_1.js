function(newMode) {
      var myDialog;
      myDialog = $("#discard-area-classifcation-confirm").dialog({
        resizable: false,
        width: 400,
        modal: true,
        buttons: {
          "Discard area classification": function() {
            $(this).dialog("close");
            Edgar.vetting.classifyHabitat._removeAllFeatures();
            return $(Edgar.map).trigger('changemode', $(this).data('newMode'));
          },
          Cancel: function() {
            return $(this).dialog("close");
          }
        }
      });
      return myDialog.data('newMode', newMode);
    }