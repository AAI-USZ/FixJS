function (arguments_to_next) {
            this.emit("work:done", [this]);
            this.$__fired = false;
            this.$__queued.shift();

            if(arguments_to_next) {
                this.$__args = Array.from(arguments_to_next);
            }

            this.fire(true);
        }