function(event){
        if(window.confirm("All your progress will be lost. Continue?")){
            wooga.castle.Storage.clear();
            window.location.reload();
        }
    }