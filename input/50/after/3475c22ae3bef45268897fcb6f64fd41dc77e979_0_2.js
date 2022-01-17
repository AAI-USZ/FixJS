function(e){
        //console.debug(e.type, e.namespace);
        askConfirmationBeforeLeavingPage = false; // it's ok to leave the page, now
        $("#endOfGameModal").modal('show');
        $("#winModal").modal('hide');
    }