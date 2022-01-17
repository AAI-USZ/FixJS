function (type, title) {
            if (current) {
                current.clear();
            }
            current = dialogSet[type];
            if (current) {
                page = status.page;
                name = status.name;
                prop = status.prop;

                current.build(title);
                elements.header.text(title);
                elements.root.attr('data-type', type).show();
                adjust();
            }
            else {
                page = name = prop = '';
                elements.header.text('');
                elements.root.removeAttr('data-type').hide();
            }
        }