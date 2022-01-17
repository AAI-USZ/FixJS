function (that) {
        that.subTree = that.recordTypeSelector.produceComponent();
        if (that.subTree.recordTypeSelect) {
            if (!that.model.recordType) {
                that.applier.requestChange("recordType", that.subTree.recordTypeSelect.selection);
            }
            that.subTree.recordTypeSelect.selection = "${recordType}";
        }

        that.applier.modelChanged.addListener("recordType", function () {
            that.refreshView();
            if (that.model.vocabs) {
                that.locate("selectVocab")
                    .add(that.locate("selectVocabLabel"))
                    .show(that.options.animationOpts.time, that.options.animationOpts.easing);
            }
        });

        if (that.options.selfRender) {
            that.refreshView();
        }
    }