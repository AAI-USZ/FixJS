function() {
                var r = checkCondition(oSettings, aData, iDataIndex, $(this));
                if(!r && andVor) {
                    show = false;
                    return;
                }else if(r && !andVor) {
                    show = true;
                    return;
                }
            }