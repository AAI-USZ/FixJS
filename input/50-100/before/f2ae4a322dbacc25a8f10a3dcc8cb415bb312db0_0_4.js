function(id, parent_id, page_size, current, total, data){
            rows[id] = { 'id' : id, 'parent_id' : parent_id, 'data' : data, 'metadata' : true,
                        'page_size' : page_size, 'current' : current, 'total' : total };
        }