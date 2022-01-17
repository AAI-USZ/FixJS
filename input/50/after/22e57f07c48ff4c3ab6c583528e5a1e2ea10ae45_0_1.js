function updateContents(){
        $.ajax("/api/connectors/installed",{
            success: function(data, textStatus, jqXHR){
                if (hidden)
                    return;
                dataLoaded(data,true);
            }
        })
    }