function (that) {
        that.events.onShowTemplate.fire();
        if (that.model.templates) {
            that.refreshView();
            that.locate("radio").prop("checked", true);
            that.locate("templates").show(that.options.animationOpts.time, that.options.animationOpts.easing);
        }
        updateModel(that);
    }