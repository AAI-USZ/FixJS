function(uri){
        var dt = this;

        // add whole new row (uri does not have a uri)
        var oddeven_class = (dt.row_container.children().length % 2 == 0 ? "even" : "odd");

        var row_div = dt.makediv(["row", oddeven_class]);
        dt.row_container.append(row_div);
        dt.row_divs_by_uri[uri]  = [row_div];

        var row_cell_width = Math.floor( (row_div.width()) / dt.get_column_uris().length);

        col_counter = 0;
        $.each(dt.columns, function(){
            var column = this;

            var cell = dt.makediv(["cell","column"+col_counter,dt.uri_to_cssclass(column['uri'])]);
            cell.css("width", row_cell_width);
            row_div.append(cell);

            cell.css("width", cell.width() - dt.get_extras(cell)); // resize once visible
            
            ++col_counter;
        });

        // clear at each
        row_div.append(dt.makediv(["clear"]));
    }