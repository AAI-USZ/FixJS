function(e){
        console.debug(e.type, e.namespace);
        $("#endOfGameModal").modal('show');
        $("#winModal").modal('hide');
    }