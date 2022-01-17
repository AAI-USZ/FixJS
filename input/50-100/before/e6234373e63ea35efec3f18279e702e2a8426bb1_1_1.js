function(data) {
                //var str = JSON.stringify(data);
                data_index = data._index;
                data_mapping = data._type;
                data_id = data._id;
                data_source = data._source;

                index = db.index(data_index),
                mapping = index.mapping(data_mapping);



                mapping.document(data_id).set(data_source);;
                if (++total % 100 === 0) {
                    console.log("datas indexed: "+total);
                }



             }