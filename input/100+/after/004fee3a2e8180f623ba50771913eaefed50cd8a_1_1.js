function routineFix(arg){
        var ndx = pgr.tofix[0].index;
        if(arg == undefined){
            arg = {
                en:pgr.tofix[0].en > pgr.tofix[0].jp?1:0,
                jp:pgr.tofix[0].en > pgr.tofix[0].jp?0:1
            };
        }
        if(pgr.en[ndx].line.length == pgr.jp[ndx].line.length){
            doNextParagraph();
        }
        if(pgr.tofix[0].en > pgr.tofix[0].jp){
            if(pgr.jp[ndx].line.length-1 == arg.jp){
                while(pgr.en[ndx].line.length > pgr.jp[ndx].line.length){
                    //pgr.en[ndx].line[arg.jp].text += pgr.en[ndx].line.pop().text;
                    pgr.en[ndx].line = shiftUp({
                        array:pgr.en[ndx].line, 
                        index:arg.jp+1
                    });
                }
                routineFix(arg.en, arg.jp);
            }
            highlightMovers({
                rflength: pgr.jp[ndx].line.length,
                yflength: pgr.en[ndx].line.length,
                r: arg.jp,
                y:arg.en,
                rl: rightList,
                yl:leftList
            });
            document.onkeydown = function(e){
                document.onkeydown = null;
                if(e.keyCode === 38){
                    //pgr.en[ndx].line[arg.en-1].text += pgr.en[ndx].line.splice(arg.en, 1)[0].text;
                    console.log(e);
                    pgr.en[ndx].line = shiftUp({
                        array:pgr.en[ndx].line, 
                        index:arg.en
                    });
                    resetLists();
                    routineFix({
                        en:arg.en,
                        jp:arg.jp
                    });
                }
                if(e.keyCode === 40){
                    routineFix({
                        en:arg.en+1,
                        jp:arg.jp+1
                    });
                }
            }
        }
        if(pgr.tofix[0].en < pgr.tofix[0].jp){
            if(pgr.en[ndx].line.length -1== arg.en){
                while(pgr.jp[ndx].line.length > pgr.en[ndx].line.length){
                    //pgr.jp[ndx].line[pgr.tofix[0].jp-2].text +=pgr.jp[ndx].line.pop().text;
                    pgr.jp[ndx].line = shiftUp({
                        array:pgr.jp[ndx].line, 
                        index:arg.en+1
                    });
                }
                routineFix(arg.en, arg.jp);
            }
            highlightMovers({
                rflength: pgr.en[ndx].line.length,
                yflength: pgr.jp[ndx].line.length,
                r: arg.en,
                y:arg.jp,
                rl: leftList,
                yl:rightList
            });
            document.onkeydown = function(e){
                document.onkeydown = null;
                if(e.keyCode === 38){
                    //pgr.jp[ndx].line[arg.jp-1].text += pgr.jp[ndx].line.splice(arg.jp, 1)[0].text;
                    pgr.jp[ndx].line = shiftUp({
                        array:pgr.jp[ndx].line, 
                        index:arg.jp
                    });
                    
                    resetLists();
                    routineFix({
                        en:arg.en,
                        jp:arg.jp
                    });
                }
                if(e.keyCode === 40){
                    
                    routineFix({
                        en:arg.en+1,
                        jp:arg.jp+1
                    });
                }
            }
        }
    }