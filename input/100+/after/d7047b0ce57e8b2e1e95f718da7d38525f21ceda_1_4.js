function routineFix(arg){
        instructions.firstElementChild.innerHTML = "choose Up or down, corresponding to whether the yellow box goes in the top or bottom red boxes.";
        if(pgr.tofix[0].en == pgr.tofix[0].jp){
            doNextParagraph();
        }
        if(pgr.tofix[0].en > pgr.tofix[0].jp){
            if(pgr.tofix[0].jp-1 == arg.jp){
                while(pgr.tofix[0].en > pgr.tofix[0].jp){
                    pgr.en[pgr.tofix[0].index][pgr.tofix[0].en-2] +=pgr.en[pgr.tofix[0].index].pop();
                }
                routineFix(arg.en, arg.jp);
            }
            if(arg.en === undefined){
                arg.en = 1;
            }
            if(arg.jp === undefined){
                arg.jp = 0;
            }
            for(i=0; i<pgr.tofix[0].en;i++){
                if(i != arg.en && !leftList[i].classList.contains('greyedOut')){
                    leftList[i].classList.add('greyedOut');
                    leftList[i].classList.remove('alert');
                    leftList[i].classList.remove('alert-error');
                }else if (i == arg.en){
                    leftList[i].classList.remove('greyedOut');
                    leftList[i].classList.add('alert');
                    leftList[i].classList.add('alert-error');
                        
                }
            }
            for(i=0; i<pgr.tofix[0].jp;i++){
                if(i != arg.jp && i!= arg.jp+1 && !rightList[i].classList.contains('greyedOut')){
                    rightList[i].classList.add('greyedOut');
                    rightList[i].classList.remove('alert');
                    rightList[i].classList.remove('alert-warning');
                }else if(i == arg.jp || i== arg.jp+1){
                    rightList[i].classList.remove('greyedOut');
                    rightList[i].classList.add('alert');
                    rightList[i].classList.add('alert-warning');
                }
            }
            document.onkeydown = function(e){
                if(e.keyCode === 38){
                    pgr.en[pgr.tofix[0].index][arg.en-1] += pgr.en[pgr.tofix[0].index].splice(arg.en, 1)[0];
                    resetLists();
                    routineFix(arg.en, arg.jp+1);
                }
                if(e.keyCode === 40){
                    routineFix(arg.en+1, arg.jp+1);
                }
            }
        }
        if(pgr.tofix[0].en < pgr.tofix[0].jp){
            if(pgr.tofix[0].en-1 == arg.en){
                while(pgr.tofix[0].jp > pgr.tofix[0].en){
                    pgr.jp[pgr.tofix[0].index][pgr.tofix[0].jp-2] +=pgr.jp[pgr.tofix[0].index].pop();
                }
                routineFix(arg.en, arg.jp);
            }
            if(arg.en === undefined){
                arg.en = 0;
            }
            if(arg.jp === undefined){
                arg.jp = 1;
            }
            console.log(arg.en+":"+arg.jp);
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
            document.onkeydown = function(e){
                if(e.keyCode === 38){
                    pgr.jp[pgr.tofix[0].index][arg.jp-1] += pgr.jp[pgr.tofix[0].index].splice(arg.jp, 1)[0];
                        
                    resetLists();
                    routineFix(arg.en, arg.jp+1);
                }
                if(e.keyCode === 40){
                        
                    routineFix(arg.en+1, arg.jp+1);
                }
            }
        }
    }