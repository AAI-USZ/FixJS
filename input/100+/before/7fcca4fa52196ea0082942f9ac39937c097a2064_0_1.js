function(container) {

        that.widget_create(container);

        container.addClass('text-widget');

        that.display_control = $('<label/>', {
            name: that.name,
            style: 'display: none;'
        }).appendTo(container);

        that.input = $('<input/>', {
            type: that.type,
            name: that.name,
            disabled: that.disabled,
            size: that.size,
            title: that.tooltip,
            keyup: function() {
                that.on_value_changed();
            }
        }).appendTo(container);

        that.input.bind('input', function() {
            that.on_value_changed();
        });

        if (that.undo) {
            that.create_undo(container);
        }

        that.create_error_link(container);
    }