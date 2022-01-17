function () {
            if (this.options.forceReadOnly) {
                this.editionReadonly();
            } else {
                this.dataBinder.editionMode("normal");
                this.$el.removeClass("edition-readonly edition-full-edit");
                this.$el.addClass("edition-normal");
            }
        }