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

        $.fn.dataTableExt.afnFiltering.push(
            function(oSettings, aData, iDataIndex) {
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
        );

        Filters = can.Control({
            init: function() {
                this.element.html(can.view('static/data_app/views/filterList.ejs', {
                    filters: this.options.filters
                }));
                $(".filterSelect").ufd();
            },

            '{Filter} created': function(list, ev, filter) {
                this.options.filters.push(filter);
                $(".filterSelect").ufd();
            },

            '.filterText keypress': function(el, event) {
                if(event.keyCode == 13) {
                    recalculateTable();
                }
            }
        });

        Filter = can.Model({
            findAll: "GET /filters",
            create: "POST /filters"
        }, {});

        var FILTERS = [
            {
                id: 1,
                text: "40"
            },
            {
                id: 2,
                text: "50"
            }
        ];

        can.fixture("GET /filters", function() {
            return FILTERS;
        });

        id = 5;
        can.fixture("POST /filters", function() {
            return {id: (id++)};
        });

        $.when(Filter.findAll()).then(
            function(filterResponse) {
                new Filters('#filterDivContainer', {
                    filters: filterResponse
                });
            }
        );
    }