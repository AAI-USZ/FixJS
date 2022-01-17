function($, _){
  var callback;

  $.fn.isValid.init();
  
  function Proxy($dialogNode, availableButtons, $textNode){
    this.dialogNode = $dialogNode;
    this.availableButtons = availableButtons;
    this.textNode = $textNode;
  }
  
  Proxy.prototype = {
    dialog: function(task, cb){
      if(cb){
        callback = cb;
      }
      this.dialogNode.dialog(task);
    },
    find: function(query){
      return this.dialogNode.find(query);
    },
    selectButtons: function(buttonNames){
      var buttons={},i=buttonNames.length;
      while(i--){
        buttons[buttonNames[i]] = this.availableButtons[buttonNames[i]];
      }
      this.dialogNode.dialog('option','buttons',buttons);
    },
    setText: function(text){
      if(this.textNode){
        this.textNode.html(text);
      }
    },
    val: function(query,value){
      this.find(query).val(value);
    }
  };

  function initDialog($dialogNode){
    var $textNode = $dialogNode.append('<p>');
    
    $dialogNode.dialog({
      autoOpen: false,
      width: 600,
      modal: true,
      close: function() {
        if(callback && callback.close){
          callback.close();
        }
      }
    });

    return new Proxy($dialogNode, {
      Ok: function(){
        if(callback && callback.submit){
          callback.submit();
        }
        $dialogNode.dialog("close");
      },
      Cancel: function(){
        if(callback && callback.cancel){
          callback.cancel();
        }
        $dialogNode.dialog("close");
      }
    }, $textNode);
  }

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
        $form.isValid('reset');
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

  function initFields($form, fieldDefinitions){
    var jQueryFunctions, fieldName, method, args, i,
    fields = [],
    fieldsLength = fieldDefinitions.length;
    
    for(i=0; i < fieldsLength; i++){
      fieldName = fieldDefinitions[i][0];
      jQueryFunctions = fieldDefinitions[i][1];
      
      $form.append(
        '<label for=\"' + fieldName + '\">'+ _(fieldName) + '</label>'
      );
      fields[i] = $('<input type=\"text\" class=\"' + fieldName + '\" name=\"' + fieldName + "\">")
        .appendTo($form);
      
      fields[i].enhanceTextfield({prompt: _(fieldName+"Prompt")});
      
      if(jQueryFunctions){
        for(method in jQueryFunctions){
          if(jQueryFunctions.hasOwnProperty(method)){
            args = jQueryFunctions[method];
            fields[i][method](args);
          }
        }
      }
    }
    return fields;
  }

  function createDialog(name, fieldDefinitions){
    var $dialogNode, proxy;

    $dialogNode = $('<div id=\"'+ name + '-dialog\" title=\"' + 
                    _(name + "Title") + '\">');

    if(fieldDefinitions){
      proxy = initFormDialog($dialogNode, fieldDefinitions);
    } else {
      proxy = initDialog($dialogNode);
    }

    return function(buttonNames, text){
      proxy.selectButtons(buttonNames);
      proxy.setText(text);
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
    ]),
    notice: createDialog('notice')
  };
}