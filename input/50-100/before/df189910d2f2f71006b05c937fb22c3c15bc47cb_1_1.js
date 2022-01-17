function () {
            if (current) {
                current.clear();
            }
            current = null;
            page = name = prop = '';
            elements.header.text('');
            elements.root.removeAttr('data-type').hide();
        }