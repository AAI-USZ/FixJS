function(event){
            event.preventDefault();
            setToSyncing(connector.connectorName)
            $.ajax("/sync/" + connector.connectorName,{
                type:"POST"
            });
        }