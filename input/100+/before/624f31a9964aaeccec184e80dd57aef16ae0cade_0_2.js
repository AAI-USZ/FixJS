function($){
  var callback;
  $.fn.isValid.init();
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

  var t10n = {
    linkTitle: 'Link',
    insertImageTitle: 'Image',
    uri: 'Link',
    uriPrompt: 'Enter or select link',
    title: 'Title',
    titlePrompt: 'Enter title',
    imageUri: 'Image Source'
  };

  function createDialog(name, fields){
    var $dialogNode, proxy, i, fieldName, jQueryFunctions, method, args,
    fieldsLength = fields.length,
    $fields = [];

    $dialogNode = $('<div id=\"'+ name + '-dialog\" title=\"' + 
                    t10n[name + "Title"] + '\"><form>');
    var $form = $dialogNode.find(":first-child");
    
    for(i=0; i < fieldsLength; i++){
      fieldName = fields[i][0];
      jQueryFunctions = fields[i][1];
      
      $form.append(
        '<label for=\"' + fieldName + '\">'+ t10n[fieldName] + '</label>'
      );
      $fields[i] = $('<input type=\"text\" class=\"' + fieldName + '\" name=\"' + fieldName + "\">")
        .appendTo($form);
      
      if(jQueryFunctions){
        for(method in jQueryFunctions){
          if(jQueryFunctions.hasOwnProperty(method)){
            args = jQueryFunctions[method];
            $fields[i][method](args);
          }
        }
      }
      $fields[i].enhanceTextfield({prompt: t10n[fieldName+"Prompt"]});
    }
    
    submit = function() {
      var args = [],i;
      for(i=0; i < fieldsLength; i++){
        args[i] = $fields[i].submit().val();
      }
      if($form.isValid()){
        callback.submit.apply(this,args);
        $dialogNode.dialog("close");
      }
    };

    proxy = initDialog($dialogNode, $fields, {
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
    
    return function(buttonNames){
      proxy.selectButtons(buttonNames);
      return proxy;
    };
  }
  
  ME.dialog = {
    link: createDialog('link',[
      ['title', {
        required: true
      }],
      ['uri', {
        combobox: {key: 'uri'},
        required: true
      }]
    ]),
    insertImage: createDialog('insertImage', [
      ['imageUri', {
        combobox: {key: 'imageUri'},
        required: true
      }],
      ['title'],
      ['uri', {
        combobox: {key: 'uri'}
      }]
    ])
  };
}