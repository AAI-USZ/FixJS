function (e) {
                clickingInside = true;

                if (this.opened()) {
                    this.close();
                    this.search.focus();
                } else if (this.enabled) {
                    this.open();
                }
                killEvent(e);

                clickingInside = false;
            }