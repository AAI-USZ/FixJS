function(ws) {
        CourseData.workspace = ws;
        CourseData.workspace["id"] = CourseData.workspace["_id"]["$oid"];
        if(!CourseData.workspace.display.filters) {
            CourseData.workspace.display.filters = [];
        }
        var filters = new can.Observe.List(CourseData.workspace.display.filters);

        if(!CourseData.workspace.display.andVor) {
            CourseData.workspace.display.andVor = can.Observe("and");
        }
        var andVor = new can.Observe().attr("andVor", CourseData.workspace.display.andVor);

        if(!CourseData.workspace.display.columns) {
            CourseData.workspace.display.columns = [];
        }
        var columns = new can.Observe.List(CourseData.workspace.display.columns);

        new FiltersControl('#filterDivContainer', {
            filters: filters
        });

        new AndVOrControl('#andVorDiv', {
            andVor: andVor
        });

        new ColumnsControl('#userTable', {
            columns: columns
        });

        new VisControl('#visDialogContainer');

        $("#newFilter").bind("click", function() {
            filters.push({not: false, "selection": "", operator: "<", "text": ""});
            $(".filterSelect").ufd();
        });

        // Restore sorting order from workspace
        calculateIndexNums();
        var settings = CourseData.masterDataTable.fnSettings();
        if(CourseData.workspace.display.sorting) {
            settings.aaSorting[0][0] = CourseData.indexNums[CourseData.workspace.display.sorting.column];
            settings.aaSorting[0][1] = CourseData.workspace.display.sorting.direction;
            settings.aaSorting[0][2] = CourseData.workspace.display.sorting.direction === "asc"? 0 : 1;
        }else {
            CourseData.workspace.display.attr({sorting: {column: "", direction: ""}});
        }

        CourseData.masterDataTable.bind('sort', function() {
            var sortData = settings.aaSorting[0];
            if(!CourseData.workspace.display.sorting ||
                    CourseData.workspace.display.sorting.column !== settings.aoColumns[sortData[0]].sTitle ||
                    CourseData.workspace.display.sorting.direction !== sortData[2]) {
                CourseData.workspace.attr("display.sorting.column", settings.aoColumns[sortData[0]].sTitle);
                CourseData.workspace.attr("display.sorting.direction", sortData[1]);
            }
        });

        CourseData.masterDataTable.fnDraw();

        // Leaving this at the end in-case any jq-buttons are added in templates
        $(".jq-button").button();


        // Adding the dropdown to the email dialog, has to be done after data is loaded
        $(".markItUpUfd").html(can.view('static/data_app/views/filterSelect.ejs'));
        // The z-index of the dialog starts counting at 1000, so setting this significantly
        // higher, to prevent the dropdown from hiding behind the dialog
        $(".markItUpUfd select").ufd({"zIndexPopup": 2000});

        CourseData.workspace.bind('change', function(ev, attr, how, newVal, oldVal) {
            if(attr !== "updated") {
                CourseData.postWorkspace();
            }
        });

        settings.aoColumns[CourseData.indexNums["Quiz 01"]].sType = "numeric";

        CourseData.fullyLoaded = true;
    }