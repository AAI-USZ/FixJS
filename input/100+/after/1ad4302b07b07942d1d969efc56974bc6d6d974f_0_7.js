function(){
            var column = this;

            var header_cell = $(dt.container.children("."+dt.cls("header")).children("."+dt.cls("column"+col_counter)));
            var row_cell_width = header_cell.width() + dt.get_extras(header_cell);

            var cell = dt.makediv(["cell","column"+col_counter,dt.uri_to_cssclass(column['uri'])]);
            cell.css("width", row_cell_width);
            row_div.append(cell);

            cell.css("width", cell.width() - dt.get_extras(cell)); // resize once visible
            
            ++col_counter;
        }