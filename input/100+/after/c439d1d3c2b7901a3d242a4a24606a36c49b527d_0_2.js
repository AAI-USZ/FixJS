function () {
        this.$hintMenu.removeClass("open");
        this.opened = false;
        
        PopUpManager.removePopUp(this.$hintMenu);
    }