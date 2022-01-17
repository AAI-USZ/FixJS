function() {
        masterDataTable = $("#userTable").dataTable({
            "bJQueryUI": true,
            "sDom": 'R<"H"lr>t<"F"ip>',
            "bScrollXInner": true,
            "sScrollX": "100%",
            "bScrollAutoCss": true
//            "bPaginate": false
        });

        masterDataTable.fnSetColumnVis(1, false);
        masterDataTable.fnSetColumnVis(4, false);
        masterDataTable.fnSetColumnVis(7, false);
        masterDataTable.fnSetColumnVis(8, false);
        masterDataTable.fnSetColumnVis(9, false);

        aoColumns = masterDataTable.fnSettings().aoColumns;
        for(var c in aoColumns) {
            $(".querySelect").append("<option value=\"" + aoColumns[c].sTitle + "\">" + aoColumns[c].sTitle + "</option>");
        }

        $(".querySelect").ufd({});

        $.fn.dataTableExt.afnFiltering.push(
            function(oSettings, aData, iDataIndex) {
                andVor = $("#andVor").val() === "all";

                if(andVor) {
                    show = true;
                }else {
                    show = false;
                }
                $(".queryDivContainer").children(".queryDiv").each(function() {
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
        );

        addNew();
    }