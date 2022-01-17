function(spec) {

    spec = spec || {};

    var that = IPA.input_widget(spec);

    that.size = spec.size || 30;
    that.input_type = spec.input_type || 'text';

    that.select_range = function(start, end){
        IPA.select_range(that.input, start, end);
    };

    that.create = function(container) {

        that.widget_create(container);

        container.addClass('text-widget');

        that.display_control = $('<label/>', {
            name: that.name,
            style: 'display: none;'
        }).appendTo(container);

        that.input = $('<input/>', {
            type: that.input_type,
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
    };

    that.update = function(values) {
        var value = values && values.length ? values[0] : '';

        if (that.read_only || !that.writable) {
            that.display_control.text(value);
            that.display_control.css('display', 'inline');
            that.input.css('display', 'none');

        } else {
            that.input.val(value);
            that.display_control.css('display', 'none');
            that.input.css('display', 'inline');
        }
    };

    that.save = function() {
        if (that.read_only || !that.writable) {
            return null;

        } else {
            var value = that.input.val();
            return value === '' ? [] : [value];
        }
    };

    that.set_enabled = function(value) {

        if(value) {
            that.input.removeAttr('disabled');
        } else {
            that.input.attr('disabled', 'disabled');
        }
    };

    that.clear = function() {
        that.input.val('');
        that.display_control.text('');
    };

    that.focus_input = function() {
        that.input.focus();
    };

    that.set_deleted = function(deleted) {
        if(deleted) {
            that.input.addClass('strikethrough');
        } else {
            that.input.removeClass('strikethrough');
        }
    };

    // methods that should be invoked by subclasses
    that.text_load = that.load;

    return that;
}