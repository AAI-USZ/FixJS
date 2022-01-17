function routineFix(enIndex, jaIndex){
        instructions.firstElementChild.innerHTML = "choose Up or down, corresponding to whether the yellow box goes in the top or bottom red boxes.";
        if(args.tofix[0].en == args.tofix[0].jp){
            doNextParagraph();
        }
        if(args.tofix[0].en > args.tofix[0].jp){
            if(args.tofix[0].jp-1 == jaIndex){
                while(args.tofix[0].en > args.tofix[0].jp){
                    args.en[args.tofix[0].index][args.tofix[0].en-2] +=args.en[args.tofix[0].index].pop();
                }
                routineFix(enIndex, jaIndex);
            }
            if(enIndex === undefined){
                enIndex = 1;
            }
            if(jaIndex === undefined){
                jaIndex = 0;
            }
            for(i=0; i<args.tofix[0].en;i++){
                if(i != enIndex && !leftList[i].classList.contains('greyedOut')){
                    leftList[i].classList.add('greyedOut');
                    leftList[i].classList.remove('alert');
                    leftList[i].classList.remove('alert-error');
                }else if (i == enIndex){
                    leftList[i].classList.remove('greyedOut');
                    leftList[i].classList.add('alert');
                    leftList[i].classList.add('alert-error');
                        
                }
            }
            for(i=0; i<args.tofix[0].jp;i++){
                if(i != jaIndex && i!= jaIndex+1 && !rightList[i].classList.contains('greyedOut')){
                    rightList[i].classList.add('greyedOut');
                    rightList[i].classList.remove('alert');
                    rightList[i].classList.remove('alert-warning');
                }else if(i == jaIndex || i== jaIndex+1){
                    rightList[i].classList.remove('greyedOut');
                    rightList[i].classList.add('alert');
                    rightList[i].classList.add('alert-warning');
                }
            }
            document.onkeydown = function(e){
                if(e.keyCode === 38){
                    args.en[args.tofix[0].index][enIndex-1] += args.en[args.tofix[0].index].splice(enIndex, 1)[0];
                    resetLists();
                    routineFix(enIndex, jaIndex+1);
                }
                if(e.keyCode === 40){
                    routineFix(enIndex+1, jaIndex+1);
                }
            }
        }
        if(args.tofix[0].en < args.tofix[0].jp){
            if(args.tofix[0].en-1 == enIndex){
                while(args.tofix[0].jp > args.tofix[0].en){
                    args.jp[args.tofix[0].index][args.tofix[0].jp-2] +=args.jp[args.tofix[0].index].pop();
                }
                routineFix(enIndex, jaIndex);
            }
            if(enIndex === undefined){
                enIndex = 0;
            }
            if(jaIndex === undefined){
                jaIndex = 1;
            }
            console.log(enIndex+":"+jaIndex);
            for(i=0; i<args.tofix[0].en;i++){
                if(i != enIndex && i!= enIndex+1 && !leftList[i].classList.contains('greyedOut')){
                    leftList[i].classList.add('greyedOut');
                    leftList[i].classList.remove('alert');
                    leftList[i].classList.remove('alert-warning');
                }else if(i == enIndex || i== enIndex+1){
                    leftList[i].classList.remove('greyedOut');
                    leftList[i].classList.add('alert');
                    leftList[i].classList.add('alert-warning');
                }
                    
            }
            for(i=0; i<args.tofix[0].jp;i++){
                if(i != jaIndex && !rightList[i].classList.contains('greyedOut')){
                    rightList[i].classList.add('greyedOut');
                    rightList[i].classList.remove('alert');
                    rightList[i].classList.remove('alert-error');
                }else if (i == jaIndex){
                    rightList[i].classList.remove('greyedOut');
                    rightList[i].classList.add('alert');
                    rightList[i].classList.add('alert-error');
                }
            }
            document.onkeydown = function(e){
                if(e.keyCode === 38){
                    args.jp[args.tofix[0].index][jaIndex-1] += args.jp[args.tofix[0].index].splice(jaIndex, 1)[0];
                        
                    resetLists();
                    routineFix(enIndex, jaIndex+1);
                }
                if(e.keyCode === 40){
                        
                    routineFix(enIndex+1, jaIndex+1);
                }
            }
        }
    }