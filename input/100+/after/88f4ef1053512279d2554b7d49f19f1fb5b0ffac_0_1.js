function (pos, settings_builder, values, aliased) {
        var data = {};
        var me = this;
        $.each(aliased, function (name, alias) {
            data[alias] = me.get(pos, name);
        });
        $.each(values, function (index, value) {
            data[value] = me.get(pos, value);
        });
        var settings = settings_builder(data);
        $.ajax(settings);
        return true;
    }