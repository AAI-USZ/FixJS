function() {
            var sortData = settings.aaSorting[0];
            if(CourseData.workspace.display.sorting.column !== settings.aoColumns[sortData[0]].sTitle ||
                    CourseData.workspace.display.sorting.direction !== sortData[2]) {
                CourseData.workspace.attr("display.sorting.column", settings.aoColumns[sortData[0]].sTitle);
                CourseData.workspace.attr("display.sorting.direction", sortData[2]);
            }
        }