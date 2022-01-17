function initFormDialog($dialogNode, fieldDefinitions){
    var fieldsLength = fieldDefinitions.length,
    $form = $dialogNode.append('<form>'),
    fields = initFields($form, fieldDefinitions);
    
    submit = function() {
      var args = [],i;
      for(i=0; i < fieldsLength; i++){
        args[i] = fields[i].submit().val();
      }
      if($form.isValid()){
        callback.submit.apply(this,args);
        $dialogNode.dialog("close");
      }
    };

    $dialogNode.dialog({
      autoOpen: false,
      width: 600,
      modal: true,
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

    return new Proxy($dialogNode, {
      Create: submit,
      Update: submit,
      Remove: function(){
        callback.remove();
        $dialogNode.dialog("close");
      },
      Cancel: function() {
	$dialogNode.dialog("close");
      }
    });
  }