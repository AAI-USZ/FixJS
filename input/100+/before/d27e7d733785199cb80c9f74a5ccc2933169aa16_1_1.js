function(oldMode, nextMode, callback, silent){
      var editor = this;
      if(silent || (nextMode.toText && oldMode.toHTML)){
        callback();
      } else {
        // TODO use i18n shortcut here
        if(nextMode.toText){
          text = 'The old mode could not convert to HTML. You will have to convert the markup manually.';
        } else {
          text = 'This mode can not convert HTML to your markup. You will have to convert the markup manually';
        }
        dialogProxy = ME.dialog.notice(['Ok', 'Cancel'], text);
        dialogProxy.dialog('open', {
          submit: function(){
            if(callback){
              callback();
            }
          },
          cancel: function(){
            editor.toolbar.div.find('.changeDataMode')
              .val(oldMode.id);
          }
        });
      }
    }