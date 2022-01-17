function(data, textStatus, jqXHR){
                query.rawDataList = typeof data.length !== 'undefined' ? data : [{ cnt: data }];
                query.context = this;
                
                callBack.success(query);
            }