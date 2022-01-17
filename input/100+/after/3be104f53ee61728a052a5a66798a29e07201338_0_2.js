function addTrayItem(){
    var id = elements.dialog.getAttribute("data-miid")
    var item = elements.dialog.getElementsByClassName("itemTitle")[0].innerHTML
    var category = elements.dialog.getAttribute("data-category")

    var checkBoxes = dialog.getElementsByClassName("optionCheckbox")
    var options = []
    for(var i=0; i<checkBoxes.length; i++){
      if(checkBoxes[i].checked){
        option = goUntilParent(checkBoxes[i], "option").getAttribute("data-moid")
        options.push(option)
      }
    }
    trayItem = new TrayItem(id, quantity, options)
    ordrin.tray.addItem(trayItem)
  }