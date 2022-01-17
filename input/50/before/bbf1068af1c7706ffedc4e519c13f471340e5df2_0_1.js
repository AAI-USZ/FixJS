function() {
            // support touching the scale to select only in Desktop
            if(!window.Touch) {
                this.element.addEventListener('mousedown', this, false);
            }
        }