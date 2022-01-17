function(){
      var self = this;

      // Add hidden fields
      self.$el.append(
        '<input name="lat" type="hidden"></input>' +
        '<input name="lng" type="hidden"></input>' +
        '<input name="heading" type="hidden"></input>' +
        '<input name="pitch" type="hidden"></input>' +
        '<input name="zoom" type="hidden"></input>'
      );

      // Handle submit event
      self.$el.submit(function() {
        self.submit.apply(self, Array.prototype.slice.call(arguments));
      });

      $(document).delegate(self.options.showFormEl, 'click', function() {
        self.showForm.apply(self, Array.prototype.slice.call(arguments));
      });

      self.$el.dialog({
        title: 'Add a Comment',
        autoOpen: false,
        modal: true,
        width:400,
        height:247,
        resizable: false,
        buttons: [
          {
            id: 'fitzgerald-dialog-save',
            text: "Save",
            click: function() {
              self.$el.submit();
              $(this).dialog("close");
            }
          }
        ]
      });

      self.initCharCounter();

      F.on('locationupdatebyslider', this.onLocationUpdate, this);
      F.on('locationupdatebyrouter', this.onLocationUpdate, this);
      F.on('locationupdatebygraph', this.onLocationUpdate, this);
      F.on('povupdatebystreetview', this.setPov, this);
    }