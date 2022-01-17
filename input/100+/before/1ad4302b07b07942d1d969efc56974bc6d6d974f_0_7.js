function(){
            var column = this;

            var cell = dt.makediv(["cell","column"+col_counter,dt.uri_to_cssclass(column['uri'])]);
            cell.css("width", row_cell_width);
            row_div.append(cell);

            cell.css("width", cell.width() - dt.get_extras(cell)); // resize once visible
            
            ++col_counter;
        }