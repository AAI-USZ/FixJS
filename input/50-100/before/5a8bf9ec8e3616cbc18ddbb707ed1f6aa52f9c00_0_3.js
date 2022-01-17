function menuClick(){
    for (var i = 0; i < menu.length; i++){
        if (menu[i].containsPoint(mouseX, mouseY)){
            menu[i].trigger();
        }
    }
}