function () {
            this.notify('pre_destroy');
            // perform a recursive destruction down the widget tree
            this.destroyContained();
            // unsubscribe to app events
            this.app_events && this.unsubscribe(this.app_events);
            // remove DOM elements
            this.remove()
                ._finally();
            return this;
        }