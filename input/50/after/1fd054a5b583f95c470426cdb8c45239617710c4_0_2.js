function(e){
        //console.debug(e.type, e.namespace);
        gameIsOn = false; // it's ok to leave the page, now
        $("#endOfGameModal").modal('show');
        $("#winModal").modal('hide');
    }