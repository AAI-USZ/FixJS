function resetItems (element, col, viewModel, info, metaData)
    {
        var template = metaData.template;

        viewModel.fire('foreach-reset', { element: element, collection: col, viewModel: viewModel }, function () {
            // Remove the bindings from the existing foreach items
            $(element).contents().each(function () {
                databindings.databind.removeBindings(this);
            });

            $(element).empty();

            if (col) {
                col.each(function (model) {
                    renderItem(element, model, template, viewModel, void(0), info);
                });
            }
        });
    }