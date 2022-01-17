function (editor) {
        this.editor = editor;

        Menus.closeAll();
        
        this.updateQueryFromCurPos();
        this.updateList();
    
        if (this.displayList.length) {
            var hintPos = this.calcHintListLocation();
            this.$hintMenu.addClass("open")
                       .css({"left": hintPos.left, "top": hintPos.top});
            this.opened = true;
            PopUpManager.addPopUp(this.$hintMenu, Menus.closeAll);
        }
    }