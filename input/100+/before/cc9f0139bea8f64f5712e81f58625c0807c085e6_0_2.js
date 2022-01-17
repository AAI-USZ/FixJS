function(){
        var dt = this;

        // TODO cache this
        var column_uris = [];
        $.each(dt.columns, function(){
            var column = this;
            column_uris.push(column['uri']);
        });
        return column_uris;
    }