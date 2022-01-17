function(oldMode, nextMode, callback, silent){
      var editor = this;
      if(silent || (nextMode.toText && oldMode.toHTML)){
        callback();
      } else {
        // TODO use i18n shortcut here
        if(nextMode.toText){
          text = 'noticeMissingToHTML';
        } else {
          text = 'noticeMissingToText';
        }
        dialogProxy = ME.dialog.notice(['Ok', 'Cancel'], _(text));
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