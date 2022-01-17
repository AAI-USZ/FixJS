function(uri, data){
            if (!(uri in dt.data)){
                dt.data[uri] = {};
                dt.add_new_row(uri);
            }

            // check all columns exist
            $.each(data, function(predicate_uri, vals){
                var column = dt.get_column(predicate_uri);
                if (column == null){
                    dt.add_column(predicate_uri, dt.basic_label(predicate_uri)); // TODO figure out the real label somehow
                }
            });

            // add new data to row
            dt.add_data_to_row(uri, data);
        }