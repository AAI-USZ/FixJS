function(event){
            event.preventDefault();
            setToSyncing(connector.connectorName)
            $.ajax("/api/sync/" + connector.connectorName,{
                type:"POST"
            });
        }