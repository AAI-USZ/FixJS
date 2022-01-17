function menuClick(evt){
    for (var i = 0; i < menu.length; i++){
        if (menu[i].containsPoint(evt.clientX, evt.clientY)){
            menu[i].trigger();
        }
    }
}