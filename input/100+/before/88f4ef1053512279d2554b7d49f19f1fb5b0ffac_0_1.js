function (pos, settings_builder, values) {
        var data = {};
        var me = this;
        $.each(values, function (index, value) {
            data[value] = me.get(pos, value);
        });
        var settings = settings_builder(data);
        $.ajax(settings);
        return true;
    }