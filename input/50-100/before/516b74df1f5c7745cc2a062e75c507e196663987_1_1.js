function(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      var delete_dialog = new cdb.admin.DeleteDialog({
        clean_on_hide: true,
        title: "",
        content: "",
        ok_button_classes: "button grey",
        cancel_button_classes: "underline margin15",
        modal_type: "confirmation",
        model: this.model
      });

      this.$el.append(delete_dialog.render().el);
      delete_dialog.open();
    }