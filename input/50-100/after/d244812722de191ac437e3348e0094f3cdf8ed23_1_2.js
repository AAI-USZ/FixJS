function(data){
          self.dialog.html(data);
          self.dialog.dialog('open');
          console.log($(self.dialog))
          $(self.dialog).data('ui_control', self)
          $.CMS.enable_uploader();
        }