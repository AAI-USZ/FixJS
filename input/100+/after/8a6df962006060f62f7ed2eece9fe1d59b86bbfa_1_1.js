function(overrides) {
    var overrides = overrides ? overrides : {};
    var id = overrides.id || this.attr('id');

    if (id == undefined) {
        alert('Widget must have an id !');
        return;
    }

    if ($.fn.yourlabsWidget.registry == undefined) {
        $.fn.yourlabsWidget.registry = {};
    }

    if ($.fn.yourlabsWidget.registry[id] == undefined) {
        // Instanciate the widget
        $.fn.yourlabsWidget.registry[id] = new yourlabs.Widget(this);

        // Pares data-*
        var data = this.data();
        var dataOverrides = {autocompleteOptions: {}};
        for (var key in data) {
            if (!key) continue;

            if (key.substr(0, 12) == 'autocomplete') {
                var newKey = key.replace('autocomplete', '');
                newKey = newKey.replace(newKey[0], newKey[0].toLowerCase())
                dataOverrides['autocompleteOptions'][newKey] = data[key];
            } else {
                dataOverrides[key] = data[key];
            }
        }

        // Allow attribute overrides
        $.fn.yourlabsWidget.registry[id] = $.extend(
            $.fn.yourlabsWidget.registry[id], dataOverrides);

        // Allow javascript object overrides
        $.fn.yourlabsWidget.registry[id] = $.extend(
            $.fn.yourlabsWidget.registry[id], overrides);

        // Setup for usage
        $.fn.yourlabsWidget.registry[id].initialize();

        // Set
        $.fn.yourlabsWidget.registry[id].widget.attr('data-widget-ready', 1);
        $.fn.yourlabsWidget.registry[id].widget.trigger('widget-ready');
    }

    return $.fn.yourlabsWidget.registry[id];
}