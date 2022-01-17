function(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      var delete_dialog = new cdb.admin.DeleteDialog({
        clean_on_hide: true,
        title: "You are about to delete this table",
        content: "You will not be able to recover this information. We really recommend you <a href='#export' class='underline'>export the data</a> before deleting it.",
        ok_button_classes: "button grey",
        ok_title: "Delete this table",
        cancel_button_classes: "underline margin15",
        modal_type: "confirmation",
        model: this.model
      });

      $("body").append(delete_dialog.render().el);
      delete_dialog.open();
    }