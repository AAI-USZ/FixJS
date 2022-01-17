function highlightMovers(args){
        for(i=0; i<pgr.tofix[0].en;i++){
            if(i != arg.en && i!= arg.en+1 && !leftList[i].classList.contains('greyedOut')){
                leftList[i].classList.add('greyedOut');
                leftList[i].classList.remove('alert');
                leftList[i].classList.remove('alert-warning');
            }else if(i == arg.en || i== arg.en+1){
                leftList[i].classList.remove('greyedOut');
                leftList[i].classList.add('alert');
                leftList[i].classList.add('alert-warning');
            }
                    
        }
        for(i=0; i<pgr.tofix[0].jp;i++){
            if(i != arg.jp && !rightList[i].classList.contains('greyedOut')){
                rightList[i].classList.add('greyedOut');
                rightList[i].classList.remove('alert');
                rightList[i].classList.remove('alert-error');
            }else if (i == arg.jp){
                rightList[i].classList.remove('greyedOut');
                rightList[i].classList.add('alert');
                rightList[i].classList.add('alert-error');
            }
        }
    }