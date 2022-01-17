function resetItems (element, col, viewModel, info, metaData)
    {
        var template = metaData.template,
            node = $(element);

        viewModel.fire('foreach-reset', { element: element, collection: col, viewModel: viewModel }, function () {
            // Remove the bindings from the existing foreach items
            if (info.isComment) {
                removeCommentContent(element, info.endCommentElement);
            }
            else {
                node.contents().each(function () {
                    databindings.databind.removeBindings(this);
                });

                node.empty();
            }

            if (col) {
                col.each(function (model) {
                    renderItem(element, model, template, viewModel, void(0), info);
                });
            }
        });
    }