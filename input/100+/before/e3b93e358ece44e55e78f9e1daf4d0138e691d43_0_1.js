function bindConnector(connector, i){
        var deleteBtn = $("#remove-" + connector.connectorName);
        deleteBtn.click({index:i}, function(event){
            event.preventDefault();
            confirmDelete(event.data.index);
        });
        var syncNowBtn = $("#syncNow-" + connector.connectorName);
        syncNowBtn.click(function(event){
            event.preventDefault();
            setToSyncing(connector.connectorName)
            $.ajax("/api/connectors/" + connector.connectorName + "/sync",{
                type:"POST"
            });
        });

    }