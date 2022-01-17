function () {
                if (this[foreachExpando] === cid) {
                    databindings.databind.removeBindings(this);
                    $(this).remove();
                    return false;
                }
            }