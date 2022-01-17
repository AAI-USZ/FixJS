function(data){
          self.dialog.html(data);
          self.dialog.dialog('open');
          $.CMS.enable_uploader();
        }