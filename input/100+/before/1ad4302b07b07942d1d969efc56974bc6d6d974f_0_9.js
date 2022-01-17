function(){
        var dt = this;

        dt.surface.addClass(dt.class_prefix+"table");

        // create a container
        dt.container = dt.makediv(["container"]);
        dt.surface.append(dt.container);

        // create the header
        dt.header = dt.makediv(["header"]);
        dt.container.append(dt.header);

        // create a row container
        dt.row_container = dt.makediv(["row_container"]);
        dt.container.append(dt.row_container);


        var header_cell_width = Math.floor( (dt.header.width()) / dt.get_column_uris().length);

        // add header row
        var col_counter = 0;
        $.each(dt.columns, function(){
            var column = this;
            column['label'] = ""+column['label'];

            var header_cell = dt.makediv(["cell","column"+col_counter,dt.uri_to_cssclass(column['uri'])]);
            header_cell.css("width", header_cell_width);
            dt.header.append(header_cell);

            header_cell.css("width", header_cell.width() - dt.get_extras(header_cell)); // resize once visible
            header_cell.html(column['label']);
            ++col_counter;
        });
        // clear at each
        dt.header.append(dt.makediv(["clear"]));
    }