function hideDialogBox(){
    if (elements.dialog.className.indexOf("hidden") == -1){
      // hide the background and dialog box
      elements.dialogBg.className   += " hidden";
      elements.dialog.className     += " hidden";
      // remove elements in option container
      var optionContainer = elements.dialog.getElementsByClassName("optionContainer")[0];
      optionContainer.removeChild(optionContainer.getElementsByClassName("optionCategoryList")[0]);
      var checkBoxes = elements.dialog.getElementsByClassName("optionCheckbox");
      for(var i=0; i<checkBoxes.length; i++){
        checkBoxes[i].checked = false;
      }
    }
  }