function(element, options) {
            columns = this.options.columns;

            var oSettings = CourseData.masterDataTable.fnSettings();

            calculateIndexNums();

            // Goes through and puts all of the visible columns in the correct
            // order on the left, and the invisible columns on the right.
            for(i = 0; i < columns.length; i++) {
                var from = CourseData.indexNums[columns[i]];
                var to = i;
                toTitle = oSettings.aoColumns[to].sTitle;

                if(from !== to) {
                    CourseData.masterDataTable.fnColReorder(from, to);


                    // Updates our cache of column order
                    var min = (to < from)? to : from;
                    var max = (to > from)? to : from;
                    for(j = min; j <= max; j++) {
                        CourseData.indexNums[oSettings.aoColumns[j].sTitle] = j;
                    }
                }
            }

            // Hide the columns that aren't mentioned in the column list
            for(i = 0; i < oSettings.aoColumns.length; i++) {
                // The 'false' here is very important for performance on large sites.
                // Keeps it from redrawing the table for each column.
                CourseData.masterDataTable.fnSetColumnVis(i, (i < columns.length), false);
            }

            // Recalculates column widths now that we've removed a bunch
            CourseData.masterDataTable.fnAdjustColumnSizing();

            CourseData.masterDataTable.bind('column-reorder', this.updateColumns);
        }