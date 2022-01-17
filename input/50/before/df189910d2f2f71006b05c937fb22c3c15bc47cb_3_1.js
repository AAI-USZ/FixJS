function () {
            if (current) {
                current.clear();
            }
            current = null;
            page = name = prop = '';
            layerRoot.removeAttr('data-type').hide();
        }