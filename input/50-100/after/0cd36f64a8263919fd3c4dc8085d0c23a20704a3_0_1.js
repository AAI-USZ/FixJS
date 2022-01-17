function (model) {
            var cid = model.get("cid"),
                encounteredItemsElements = false;

            // Remove the item from the dom
            itemElements.each(function () {
                // If this element belongs to the item
                if (this[foreachExpando] === cid) {
                    encounteredItemsElements = true;
                    databindings.databind.removeBindings(this);
                    $(this).remove();
                }
                // Else if this element is for a different item and the item's elements have already been encountered (and removed) then we are all done
                else if (encounteredItemsElements) {
                    return false;
                }
            });
        }