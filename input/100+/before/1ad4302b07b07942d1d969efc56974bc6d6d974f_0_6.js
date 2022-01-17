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
                cell.html("&nbsp;");
            }

            ++column_counter;
        }