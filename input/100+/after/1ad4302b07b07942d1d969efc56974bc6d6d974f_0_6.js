function(){
            var cell = $(this);
            var property_uri = dt.get_column_uris()[column_counter];

            if (property_uri in rows){
                var rowdata = rows[property_uri];

                if (!(property_uri in dt.data[rowuri])){
                    dt.data[rowuri][property_uri] = [];
                }

                if (typeof(rowdata) == "string"){
                    rowdata = [rowdata];
                }

                $.each(rowdata, function(){
                    var value = ""+this;

                    if ($.inArray(value, dt.data[rowuri][property_uri]) === -1){
                        dt.data[rowuri][property_uri].push(value);

                        var innercell = dt.makediv(["innercell"]);
                        cell.append(innercell);
                        innercell.html(value);
                    }
                });
            } else {
                // not in this data, do nothing

                // but make sure the cell has a non-breaking space at minimum
                if (cell.html() == ""){
                    cell.html("&nbsp;");
                }
            }

            ++column_counter;
        }