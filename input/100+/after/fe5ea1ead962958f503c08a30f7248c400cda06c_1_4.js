function afterModelsRemoved (element, viewModel, info, metaData, e)
    {
        // For a comment element grab the siblings otherwise grab the siblings
        var itemElements = info.isComment ? $(element).nextUntil(info.endCommentElement) : $(element).contents();

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