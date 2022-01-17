function show(direction) {
            this.animShow(direction);
            this.triggerEvent(Panel.ON_SHOW, [this]);
        }