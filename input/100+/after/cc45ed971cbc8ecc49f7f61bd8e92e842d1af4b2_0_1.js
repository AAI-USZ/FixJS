function(){
    var j = this.$;
    var self = this;
    var editors = j.find('.editor');
    
    // Copy the values from the fields to the proper html elements
    editors.each(function(index){
      editor = RB.$(this);
      fieldName = editor.attr('name');
      if(this.type.match(/select/)){
        j.children('div.' + fieldName).children('.v').text(editor.val())
        j.children('div.' + fieldName).children('.t').text(editor.children(':selected').text());
      // } else if(this.type.match(/textarea/)){
      //   this.setValue('div.' + fieldName + ' .textile', editors[ii].value);
      //   this.setValue('div.' + fieldName + ' .html', '-- will be displayed after save --');
      } else {
        j.children('div.' + fieldName).text(editor.val());
      }
    });

    // Mark the issue as closed if so
    self.markIfClosed();

    // Get the save directives.
    var saveDir = self.saveDirectives();

    self.beforeSave();

    self.unmarkError();
    self.markSaving();
    
    RB.ajax({
       type: "POST",
       url: saveDir.url,
       data: saveDir.data,
       success: function(d, t, x){
          self.afterSave(d,t,x);
          self.refreshTooltip(self);
       },
       error : function(x,t,e){ self.error(x,t,e); }
    });

    self.endEdit();
    self.$.find('.editors').remove();
  }