function () {
            // Prevents recursive triggering
            this.opts.element.data("select2-change-triggered", true);
            this.opts.element.trigger("change");
            this.opts.element.data("select2-change-triggered", false);
        }