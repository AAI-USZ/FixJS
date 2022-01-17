function(e){
        console.log($(e.target).parents('tr').prevAll('tr').size());
    }