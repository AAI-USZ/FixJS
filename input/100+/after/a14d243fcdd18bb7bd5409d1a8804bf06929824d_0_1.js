function(container) {
        that.container = container;

        var attr_container = $('<div/>', {
            'class': 'aci-attribute-table-container'
        }).appendTo(container);

        that.table = $('<table/>', {
            id:id,
            'class':'search-table aci-attribute-table scrollable'
        }).
            append('<thead/>').
            append('<tbody/>').
            appendTo(attr_container);

        var tr = $('<tr></tr>').appendTo($('thead', that.table));

        tr.append($('<th/>', {
            html: $('<input/>', {
                type: "checkbox",
                click: function() {
                    $('.aci-attribute', that.table).
                        attr('checked', $(this).attr('checked'));
                    that.value_changed.notify([], that);
                }
            })
        })).append($('<th/>', {
            'class': 'aci-attribute-column',
            html: IPA.messages.objects.aci.attribute
        }));

        if (that.undo) {
            that.create_undo(container);
        }

        if (that.object_type) {
            that.populate(that.object_type);
        }

        that.create_error_link(container);
    }