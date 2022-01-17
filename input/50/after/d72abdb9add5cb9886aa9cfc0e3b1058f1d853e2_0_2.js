function(){
            if(History.initialized == true)
                History.push(location.href);
            else
                location.reload();
        }