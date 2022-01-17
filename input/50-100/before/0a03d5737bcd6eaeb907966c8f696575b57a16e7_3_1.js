function (that) {
        that.events.updateModel.fire({
            currentSelection: that.locate("radio").val(),
            createFromSelection: that.model.createFromSelection,
            templateSelection: that.model.templateSelection
        });
    }