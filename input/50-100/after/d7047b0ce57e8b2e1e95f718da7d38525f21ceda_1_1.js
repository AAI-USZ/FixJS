function(e){
        if(String.fromCharCode(e.charCode).toLocaleUpperCase() === 'N'){
            for(i=0; i<pgr.tofix[0].jp;i++){
                rightList[i].classList.remove('greyedOut');
            }
            checkSplit();
        }
    }