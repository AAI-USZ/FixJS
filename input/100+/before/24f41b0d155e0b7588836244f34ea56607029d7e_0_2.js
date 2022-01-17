function(oSettings, aData, iDataIndex) {
            calculateIndexNums();
            andVor = $("#andVor").val() === "all";

            if(andVor) {
                show = true;
            }else {
                show = false;
            }
            $("#filterDivContainer").find(".filterDiv").each(function() {
                r = checkCondition(oSettings, aData, iDataIndex, $(this));
                if(!r && andVor) {
                    show = false;
                    return;
                }else if(r && !andVor) {
                    show = true;
                    return;
                }
            });

            return show;
        }