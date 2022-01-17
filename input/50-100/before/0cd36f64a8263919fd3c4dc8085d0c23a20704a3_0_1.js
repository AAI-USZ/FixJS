function (model) {
            var cid = model.get("cid");

            // Remove the item from the dom
            itemElements.each(function () {
                if (this[foreachExpando] === cid) {
                    databindings.databind.removeBindings(this);
                    $(this).remove();
                    return false;
                }
            });
        }