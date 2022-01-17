function createDialog(name, fieldDefinitions){
    var $dialogNode, proxy;

    $dialogNode = $('<div id=\"'+ name + '-dialog\" title=\"' + 
                    t10n[name + "Title"] + '\">');

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