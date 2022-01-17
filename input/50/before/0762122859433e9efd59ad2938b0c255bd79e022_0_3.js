function(e, numberOfMoves){
        console.debug(e.type, e.namespace, numberOfMoves);
        //win modal shown does not imply redirection
        //no need to deactivate leaveGame on unload
        //window.onunload = null;// to prevent call to leaveGame() (see registration in javascript in initListeners())
        $("#winModal").modal('show');
    }