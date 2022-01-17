function initDialog(dialogNode, fields, availableButtons){
    var fieldsLength = fields.length, $form = dialogNode.find(":first-child");
    dialogNode.dialog({
      autoOpen: false,
      width: 600,
      close: function() {
        if(callback.close){
          callback.close();
        }
        for(i = 0; i < fieldsLength; i++){
          fields[i].val('')
            .removeAttr('checked')
            .removeAttr('selected');
        }
      },
      open: function(){
        for(i = 0; i < fieldsLength; i++){
          fields[i].change();
        }
        fields[0][0].setSelectionRange(0,0);
        $form.isValid('reset');
      }
    });

    return {
      dialog: function(task, cb){
        if(cb){
          callback = cb;
        }
        dialogNode.dialog(task);
      },
      find: function(query){ return dialogNode.find(query); },
      selectButtons: function(buttonNames){
        var buttons={},i=buttonNames.length;
        while(i--){
          buttons[buttonNames[i]] = availableButtons[buttonNames[i]];
        }
        dialogNode.dialog('option','buttons',buttons);
      },
      val: function(query,value){
        this.find(query).val(value);
      }
    };
  }