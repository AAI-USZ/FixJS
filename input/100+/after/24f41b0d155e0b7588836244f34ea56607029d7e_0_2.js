function(oSettings, aData, iDataIndex) {
            calculateIndexNums();
            var andVor = $("#andVor").val() === "all";

            var show;
            if(andVor) {
                show = true;
            }else {
                show = false;
            }
            $("#filterDivContainer").find(".filterDiv").each(function() {
                var r = checkCondition(oSettings, aData, iDataIndex, $(this));
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