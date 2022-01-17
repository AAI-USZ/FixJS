function (that) {
        cspace.util.preInitMergeListeners(that.options, {
            collapseOn: function () {
                that.locate("templates").hide(that.options.animationOpts.time, that.options.animationOpts.easing);
            }
        });
        fixupModel(that.model, that.applier, that.options.parentBundle.messageBase);
        fluid.each(["templateSelection", "createFromSelection"], function (value) {
            that.applier.modelChanged.addListener(value, function () {
                updateModel(that);
            });
        });
    }