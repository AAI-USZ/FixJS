function hide(direction) {
            this.animHide(direction);
            this.triggerEvent(Panel.ON_HIDE, [this]);
        }