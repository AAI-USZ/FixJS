function(uri, data){
            if (!(uri in dt.data)){
                dt.data[uri] = {};
                dt.add_new_row(uri);
            }
            dt.add_data_to_row(uri, data);
        }