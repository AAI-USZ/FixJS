function (e) {
                clickingInside = true;

                if (this.opened()) {
                    this.close();
                    this.container.focus();
                } else if (this.enabled) {
                    this.open();
                }
                killEvent(e);

                clickingInside = false;
            }