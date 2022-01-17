function afterModelsRemoved (element, viewModel, info, metaData, e)
    {
        var itemElements = $(element).contents();

        // If there is a list view then remove each model from it
        _.each(e.info.items, function (model) {
            var cid = model.get("cid");

            // Remove the item from the dom
            itemElements.each(function () {
                if (this[foreachExpando] === cid) {
                    databindings.databind.removeBindings(this);
                    $(this).remove();
                    return false;
                }
            });
        }, this);
    }