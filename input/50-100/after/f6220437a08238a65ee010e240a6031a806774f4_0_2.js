function () {
            if (this.options.forceReadOnly) {
                this.editionReadonly();
            } else {
                this.dataBinder.editionMode("full-edit");
                this.$el.removeClass("edition-readonly edition-normal");
                this.$el.addClass("edition-full-edit");
            }
        }