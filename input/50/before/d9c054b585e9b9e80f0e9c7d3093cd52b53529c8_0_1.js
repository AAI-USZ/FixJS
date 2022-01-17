function(event){
        if(window.confirm("All your progress will be loose. Continue?")){
            wooga.castle.Storage.clear();
            window.location.reload();
        }
    }