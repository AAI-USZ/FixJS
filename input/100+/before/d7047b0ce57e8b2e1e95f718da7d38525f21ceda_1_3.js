function(e){
                if(e.keyCode === 38){
                    args.jp[args.tofix[0].index][jaIndex-1] += args.jp[args.tofix[0].index].splice(jaIndex, 1)[0];
                        
                    resetLists();
                    routineFix(enIndex, jaIndex+1);
                }
                if(e.keyCode === 40){
                        
                    routineFix(enIndex+1, jaIndex+1);
                }
            }