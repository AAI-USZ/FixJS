function(data){
        showScene('win');
        if(data == -1){
            showWin('boss');
        }else{
            showWin(~~data-1);
        }
    }