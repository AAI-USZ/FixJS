function(e){
                if(e.keyCode === 38){
                    pgr.jp[pgr.tofix[0].index][arg.jp-1] += pgr.jp[pgr.tofix[0].index].splice(arg.jp, 1)[0];
                        
                    resetLists();
                    routineFix(arg.en, arg.jp+1);
                }
                if(e.keyCode === 40){
                        
                    routineFix(arg.en+1, arg.jp+1);
                }
            }