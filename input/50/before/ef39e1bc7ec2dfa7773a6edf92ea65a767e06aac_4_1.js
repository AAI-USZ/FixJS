function(data, textStatus, jqXHR){
                query.rawDataList = data;
                query.context = this;
                
                callBack.success(query);
            }