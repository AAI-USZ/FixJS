function(e){
                if(e.keyCode === 38){
                    args.en[args.tofix[0].index][enIndex-1] += args.en[args.tofix[0].index].splice(enIndex, 1)[0];
                    resetLists();
                    routineFix(enIndex, jaIndex+1);
                }
                if(e.keyCode === 40){
                    routineFix(enIndex+1, jaIndex+1);
                }
            }